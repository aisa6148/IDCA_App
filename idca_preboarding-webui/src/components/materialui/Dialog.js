import { Dialog } from '@material-ui/core';
import styled from 'styled-components';

export default styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 30px;
    width: calc(100% - 60px);
    height: calc(100% - 120px);
  },
`;
