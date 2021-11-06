import styled from "styled-components";
import { Row } from "antd";

export const ExtendedPhotoStyle = styled.div`
  align-items: center;
  text-align: center;
  line-height: 13em;
  width: 100%;
  height: 100%;
  border-right: ${({ bgUrl }: { bgUrl: string | null }) =>
    bgUrl ? "none" : "1px solid #ccc"};
  background: url(${({ bgUrl }: { bgUrl: string | null }) => bgUrl}) center
    center / cover no-repeat;
`;

export const ExtendedRowStyle = styled(Row)`
  background: rgb(149 155 164 / 70%);
  border-radius: 5px;
  box-shadow: 3px 4px 4px 0px rgb(0 0 0 / 19%);
  overflow: hidden;
  height: 450px;
  justify-content: space-between;
`;
