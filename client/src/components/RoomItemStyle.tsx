import styled from "styled-components";

export const RoomShadowStyle = styled.div`
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
`;

export const RoomItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
  height: 200px;
  border-radius: 5px;
  background-color: rgb(149 155 164 / 70%);
  box-shadow: 3px 4px 4px 0px rgb(0 0 0 / 19%);
  width: 100%;
  background: url(${({ bgUrl }: { bgUrl: string | null }) => bgUrl}) center
    center / cover no-repeat;
  position: relative;
  justify-content: space-between;
  padding: 10px;

  h1 {
    color: #fff;
    font-size: 70px;
    letter-spacing: -12px;
    z-index: 2;
    position: relative;
  }

  div:first-child {
    justify-content: space-between;
  }

  & > div {
    justify-content: center;
    z-index: 2;
    position: relative;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    z-index: 1;
  }
`;
