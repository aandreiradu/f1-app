import styled from "styled-components";

export const RaceListingItem = styled.li`
  list-style: none;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  backface-visibility: hidden;
  flex-wrap: wrap;
  overflow: hidden;
  padding: 10px 0;
  margin: 5px 0;
  color: #000;
  background-color: #fff;
  border-radius: 8px;
`;

export const RaceListingItemDate = styled.div`
  width: 65px;
  text-align: center;

  & p {
    font-size: 1.2rem;
    font-weight: 600;
  }

  & span {
    background-color: #ccc;
    padding: 2px 10px;
    border-radius: 5px;
  }
`;

export const RaceListingDetails = styled.div`
    width: calc(100% - 65px);
    padding-left: 10px;
    border-left: dotted 2px #d0d0d2;

    & p {
        font-size: 1rem;
    margin-bottom: 5px;
    text-transform: uppercase;
    font-weight: bold;
    }
`