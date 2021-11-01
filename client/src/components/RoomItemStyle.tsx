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

  h1 {
    color: #fff;
    font-size: 70px;
    letter-spacing: -12px;
  }

  div:first-child {
    justify-content: space-between;
  }

  div {
    justify-content: center;
  }
`;

export const RoomItemStyle = styled.div`
  color: #fff;
  height: 100%;
  background: rgb(149 155 164 / 70%);
  border-radius: 5px;
  box-shadow: 3px 4px 4px 0px rgb(0 0 0 / 19%);
  height: 100%;
  background: url(https://source.unsplash.com/random) center center / cover
    no-repeat;
  position: relative;
  z-index: 1;
  overflow: hidden;

  &:hover .showDescRoom {
    top: 0;
    opacity: 1;
    visibility: visible;
  }
`;
