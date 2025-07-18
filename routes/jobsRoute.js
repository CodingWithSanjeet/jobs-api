const express = require("express");
const {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobsController");
const router = express.Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;
