// srs/middlewares/notFoundHandler.js

export const notFoundHandler = async (req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
  };
  // export const notFoundHandler = (req, res, next) => {
  //   res.status(404).json({
  //     message: 'Route not found',
  //   });
  // };