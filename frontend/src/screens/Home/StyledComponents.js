import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const HomeContainer = styled(Box)`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 160px);
`;

export const StyledButon = styled(Button)`
  background-color: #444;
  color: #fff;
  padding: 3px 10px 0 10px;

  &:hover {
    background-color: #555;
  }
`;

export const StyledInput = styled("input")`
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;