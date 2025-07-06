const asyncErrHandler = require("../utils/asyncErrorHandler");
const Job = require("../models/Job");
const { NotFoundError } = require("../errors");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../helper/response");

const createJob = asyncErrHandler(async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user.userId });
  sendSuccessResponse(res, { job }, "Job created successfully", 201);
});

const getAllJobs = asyncErrHandler(async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort(
    "-createdAt"
  );
  sendSuccessResponse(
    res,
    { jobs, total: jobs.length },
    "Jobs fetched successfully!",
    200
  );
});

const getJob = asyncErrHandler(async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });
  if (!job) throw new NotFoundError(`No job with ${req.params.id} found.`);
  sendSuccessResponse(res, { job }, "Job fetched successfully", 200);
});

const deleteJob = asyncErrHandler(async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
  } = req;
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) throw new NotFoundError(`No job with id ${jobId} found`);
  sendSuccessResponse(res, { job }, `${job.company} deleted successfully`, 200);
});

const updateJob = asyncErrHandler(async (req, res) => {
  const {
    params: { id: jobId },
    user: { userId },
    body: updatedJob,
  } = req;
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    updatedJob,
    { new: true, runValidators: true }
  );
  if (!job) throw new NotFoundError(`No job with id ${jobId} found`);
  sendSuccessResponse(res, { job }, `${job.company} updated successfully`, 200);
});

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
