import styled from '@emotion/styled';
import Box from '@mui/material/Box';

export const SignInContainer = styled(Box)`
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