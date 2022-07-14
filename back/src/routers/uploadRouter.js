import { Router } from "express";
import { s3Upload, s3Delete } from "../middlewares/multerS3";
import { login_required } from "../middlewares/login_required";

const uploadRouter = Router();

/**
 * 이미지 업로드 
 */
uploadRouter.post(
  "/image",
  login_required,
  s3Upload(),
  async (req, res, next) => {
    try {
      const uploadFile = req.file;
      const fileName = String(uploadFile.key).split("img/")[1];

      if (!uploadFile) {
        return res.status(400).json({
          success: false,
          message: "업로드 실패",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "업로드 성공",
          imageURL: uploadFile.location,
          fileName: fileName,
        });
      };

    } catch(error) {
      next(error);
      return res.status(400).send("변경사항이 정상적으로 적용되지 않았습니다. 사진을 다시 등록해주세요");
    }
  }
)

export {uploadRouter};