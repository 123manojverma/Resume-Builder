const pdfParse=require("pdf-parse")
const {generateInterviewReport}=require("../services/ai.service")
const interviewReportModel=require("../models/interviewReport.model")

const path = require("path");
const puppeteer=require("puppeteer")
const {generateResumePdf}=require("../services/ai.service")
/**
 * @route POST /api/interview
 * @description Controller to generate interview report based on user self description, resume and job description
 * @access private
 */

async function generateInterViewReportController(req,res){
    const pdfOptions = {
        data: req.file.buffer, // Buffer correctly handles binary data
        standardFontDataUrl: path.join(process.cwd(), 'node_modules', 'pdfjs-dist', 'standard_fonts').replace(/\\/g, '/') + '/'
    };
    
    const resumeContent=await (new pdfParse.PDFParse(pdfOptions)).getText()
    const {selfDescription,jobDescription}=req.body

    const interViewReportByAi=await generateInterviewReport({
        resume:resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport=await interviewReportModel.create({
        user:req.user.id,
        resume:resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(201).json({
        message:"Interview report generated successfully",
        interviewReport
    })
}

/**
 * @route GET /api/interview/report/:interviewId
 * @description Controller to get interview report by interviewId
 * @access private
 */

async function generateInterViewReportByIdController(req,res){
    const {interviewId}=req.params

    const interviewReport=await interviewReportModel.findOne({_id: interviewId,user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    res.status(200).json({
        message:"Interview report fetched successfully",
        interviewReport
    })
}

/**
 * @route GET /api/interview
 * @description Controller to get all interview reports of the user
 * @access private
 */

async function getAllInterViewReportsController(req,res){
    const interviewReports=await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan -matchScore")

    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description
 */

async function generateResumePdfController(req,res){
    const {interviewReportId}=req.params

    const interviewReport=await interviewReportModel.findById(interviewReportId)

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }

    const pdfBuffer=await generateResumePdf({
        resume:interviewReport.resume,
        selfDescription:interviewReport.selfDescription,
        jobDescription:interviewReport.jobDescription
    })

    res.setHeader("Content-Type","application/pdf")
    res.setHeader("Content-Disposition","attachment; filename=resume.pdf")
    res.send(pdfBuffer)
}

module.exports={generateInterViewReportController,generateInterViewReportByIdController,getAllInterViewReportsController,generateResumePdfController}