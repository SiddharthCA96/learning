const express = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin,Course } = require("../db");
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    //check if user already exits(lets say ki for this ik baarhi kra)
    await Admin.create({
        username:username,
        password:password
    })
    res.json({
        message:'Admin created successfully'
    })
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.tprice;
    const newCourse=await Course.create({
        title,
        description,
        imageLink,
        price
    })
    res.json({
        message:'course created successfully',courseId:newCourse.id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    res.json({
        courses:allCourses
    })
});

module.exports = router;