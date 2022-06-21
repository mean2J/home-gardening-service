import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import * as Api from "../../api";

const CommunityFreeComment = (text) => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  // params를 통해 댓글 불러오기
  useEffect(() => {
    Api.get(`comments/${id}`).then((res) => {
      setComment(res.data.comment);
    });
  }, [id]);

  const handleChange = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    setComment(e.target.value);
  };
  return (
    <Box>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel>댓글 달기...</InputLabel>
        <Input
          onChange={handleChange}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
    </Box>
  );
};

export default CommunityFreeComment;
