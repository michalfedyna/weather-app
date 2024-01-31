import React, { FC } from "react";
import styled from "styled-components";
import {
  SearchSVGIcon,
  GpsFixedSVGIcon,
  DeleteSVGIcon,
} from "@react-md/material-icons";

type SearchBarProps = {
  onSearchClick: () => void;
  onGPSClick: () => void;
  onResultClick: (result: { lat: number; lng: number; name: string }) => void;
  onClearClick: () => void;
  queryResults?: Array<{ lat: number; lng: number; name: string }>;
  query: { value: string; search: boolean };
  setQuery: (value: SearchBarProps["query"]) => void;
};

const SearchBar: FC<SearchBarProps> = ({
  onSearchClick,
  onGPSClick,
  onResultClick,
  onClearClick,
  queryResults,
  query,
  setQuery,
}) => {
  return (
    <Container>
      <Button onClick={onGPSClick}>
        <GPSIcon />
      </Button>
      <Input
        type="text"
        value={query.value}
        onChange={(e) =>
          setQuery({
            value: e.target.value,
            search: true,
          })
        }
        placeholder="Search your location"
      />
      <Button
        style={{ marginRight: "0.5rem" }}
        onClick={onClearClick}
      >
        <DeleteIcon />
      </Button>
      <Button onClick={onSearchClick}>
        Search
        <SearchIcon />
      </Button>
      <List $visible={(queryResults && queryResults?.length > 0) || false}>
        {queryResults?.map((result, index) => (
          <ListItemContainer key={index} onClick={() => onResultClick(result)}>
            <ListItem>{result.name}</ListItem>
          </ListItemContainer>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-color: #efefef;
    border-radius: 20px;
    box-shadow: rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
    left: 16px;
    padding: 20px;
    position: absolute;
    top: 16px;
    z-index: 10000;
    box-sizing: border-box;
    width: calc(60% - 52px);
    @media (max-width: 1050px) {
       width: calc(100% - 32px); 
    }
`;

const ListItemContainer = styled.div`
  padding: 5px 20px;

  &:hover {
    background-color: #f4f5f7;
    cursor: pointer;
  }
`;

const ListItem = styled.p``;

const List = styled.div<{ $visible: boolean }>`
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  position: absolute;
  border-radius: 20px;
  box-sizing: border-box;
  background-color: #efefef;
  width: 100%;
  top: calc(70px + 1.5rem);
  z-index: 10000;
  overflow-y: scroll;
  max-height: 50vh;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
`;

const Input = styled.input`
  border-radius: 5px;
  border: none;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
  box-sizing: border-box;
  font-size: 1rem;
  flex: 1;
  line-height: 1.5rem;
  outline: none;
  padding: 0.5rem;
  margin: 0 0.5rem;
`;

const SearchIcon = styled(SearchSVGIcon)`
  color: #5e6c84;
  margin-left: 0.5rem;
  height: 1.5rem;
  width: 1.5rem;
`;

const GPSIcon = styled(GpsFixedSVGIcon)`
  color: #8bb4fa;
  height: 1.5rem;
  width: 1.5rem;
`;

const DeleteIcon = styled(DeleteSVGIcon)`
  color: #5e6c84;
  height: 1.5rem;
  width: 1.5rem;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0 0 0 1px;
  box-sizing: border-box;
  color: #5e6c84;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  outline: none;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #f4f5f7;
  }
`;

export { SearchBar };
