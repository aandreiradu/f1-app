import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const DriverItem = styled(motion.li)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  background-color: rgba(109, 109, 109, 0.3);
  border-radius: 7px;
  height: 250px;
  /* width: 200px; */
`;

export const DriverProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 175px;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    background-position: center center;
    background-repeat: no-repeat;
  }
`;

export const DriverName = styled.p`
  width: 100%;
  color: #fff;
  text-align: center;
  font-size: 1.2rem;
`;

export const DriverMoreDetails = styled(Link)`
  cursor: pointer;
  background-color: #e10600;
  border: none;
  padding: 0.25rem 0;
  color: #fff;
  font-weight: bold;
  margin-bottom: 10px;
  border-radius: 7px;
  /* width: 80%; */
  width: 120px;
  text-align: center;
`;
