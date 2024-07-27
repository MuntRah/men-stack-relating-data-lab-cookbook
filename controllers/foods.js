const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Adjust path as necessary

// GET all foods for the current user
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("foods/index.ejs", {
      foods: currentUser.pantry,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET form to create new food item
router.get("/new", (req, res) => {
  res.render("foods/new.ejs");
});

// POST new food item
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET specific food item
router.get("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId);
    res.render("foods/show.ejs", {
      item: item,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// DELETE food item
router.delete("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.pantry.id(req.params.itemId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// GET edit form for a food item
router.get("/:itemId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId);
    res.render("foods/edit.ejs", {
      item: item,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// PUT (update) food item
router.put("/:itemId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const item = currentUser.pantry.id(req.params.itemId); // Corrected here
    item.set(req.body); // Change 'food' to 'item'
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/foods/`); // Fixed redirect path
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;
