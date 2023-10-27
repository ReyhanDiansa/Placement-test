const destinationModel = require("../models/destinationModel");
const mongoose = require("mongoose");

exports.addDestination = async (request, response) => {
  try {
    const data = {
      title: request.body.title,
      description: request.body.description,
      img: request.body.img,
    };
    for (const [key, value] of Object.entries(data)) {
      if (!value || value === "") {
        return response
          .status(400)
          .json({ message: `${key} must be filled in`, success: false });
      }
    }
    const lowercaseTitle = data.title.toLowerCase();
    const destination = await destinationModel.findOne({
      title: { $regex: new RegExp(`^${lowercaseTitle}$`, "i") },
    });

    if (!destination) {
      const createdDestination = await destinationModel.create(data);

      return response.status(200).json({
        message: "Success add Destination",
        data: createdDestination,
        success: true,
      });
    } else {
      return response.status(400).json({
        message: "The title already exists, look for another one",
        success: false,
      });
    }
  } catch (error) {
    return response.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.deleteDestination = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: `Invalid ID`,
        success: false,
      });
    }
    const destination = await destinationModel.findByIdAndDelete(id);

    if (!destination) {
      return response.status(400).json({
        message: `Cannot find any data with ID ${id}`,
        success: false,
      });
    }

    return response
      .status(200)
      .json({ message: "Success delete destination", success: true });
  } catch (error) {
    return response.status(400).json({ message: error.message, success: false });
  }
};

exports.getDestination = async (request, response) => {
  try {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;

    const skip = (page - 1) * limit;

    const totalItems = await destinationModel.countDocuments();

    if (totalItems === 0) {
      return response
        .status(400)
        .json({ message: "No destination data", success: false });
    }

    const destination = await destinationModel.find().skip(skip).limit(limit);
    const totalPages = Math.ceil(totalItems / limit);
    if (page > totalPages) {
      return response.status(400).json({
        message: `page exceed total pages`,
        success: false,
      });
    } else {
      return response.status(200).json({
        data: destination,
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage: limit,
        success: true,
      });
    }
  } catch (error) {
    return response.status(400).json({ message: error.message, success: false });
  }
};

exports.updateDestination = async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: `Invalid ID`,
        success: false,
      });
    }

    const find = await destinationModel.findOne({ _id: id });
    if (!find || find === null) {
      return response.status(400).json({
        message: `Cannot find any data with ID ${id}`,
        success: false,
      });
    }

    const data = {
      title: request.body.title,
      description: request.body.description,
      img: request.body.img,
    };
    const lowercaseTitle = data.title.toLowerCase();

    let checkDestination = await destinationModel.findOne({
      $and: [
        {
          _id: { $ne: id },
          title: { $regex: new RegExp(`^${lowercaseTitle}$`, "i") },
        },
      ],
    });

    if (!checkDestination || checkDestination === null) {
      await destinationModel.findByIdAndUpdate(id, data);
      const newItem = await destinationModel.findOne({_id:id});
      return response.status(200).json({
        message: "Success update",
        data: 
          newItem,
        success: true,
      });
    } else {
      return response.status(400).json({
        message: "The title already exists, look for another one",
        success: false,
      });
    }
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.message, success: false });
  }
};

exports.findDestination = async (request, response) => {
  try {
    const { id } = request.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        message: `Invalid ID`,
        success: false,
      });
    }
    const destination = await destinationModel.findById(id);
    if (destination.length === 0 || !destination) {
      return response.status(400).json({
        message: "no destination data with that ID",
        success: false,
      });
    }
    return response.status(200).json({ data: destination, success: true });
  } catch (error) {
    return response.status(400).json({ message: error.message, success: false });
  }
};

exports.findByTitle = async (request, response) => {
  try {
    const { title } = request.body;
    const { page, limit } = request.query;
    const lowercaseTitle = title.toLowerCase();

    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const find = await destinationModel
      .find({ title: { $regex: new RegExp(lowercaseTitle, "i") } })
      .skip(skip)
      .limit(pageSize);

    const count = await destinationModel.countDocuments({
      title: { $regex: new RegExp(lowercaseTitle, "i") },
    });

    if (!find || count === 0) {
      return response.status(400).json({
        message: `Cannot find any data with title: ${title}`,
        success: false,
      });
    } else {
      const totalPages = Math.ceil(count / pageSize);
      if (page > totalPages) {
        return response.status(400).json({
          message: `page exceed total pages`,
          success: false,
        });
      } else {
        return response.status(200).json({
          data: find,
          success: true,
          currentPage: page,
          totalPages,
          totalItems: count,
          itemsPerPage: pageSize,
        });
      }
    }
  } catch (error) {
    return response
      .status(400)
      .json({ message: error.message, success: false });
  }
};
