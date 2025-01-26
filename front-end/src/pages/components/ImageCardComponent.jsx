import React from 'react';
import { styled } from '@mui/material/styles';

const StyledDiv = styled('div')({
  margin: "5px",
  height: "300px",
  width: "300px",
  objectFit: "cover",

  '& img': {
    objectFit: "cover",
    width: "100%",
    height: "100%",
    margin: "5px",
  },
});

export const ImageCard = ({ src, alt }) => {
  return (
    <StyledDiv>
      <img src={src}/>
    </StyledDiv>
  );
};