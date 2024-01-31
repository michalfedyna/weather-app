import React, { FC } from "react";
import {
  Container,
  Input,
  Button,
  List,
  ListItemContainer,
  ListItem,
  DeleteIcon,
  SearchIcon,
  GPSIcon,
  SearchButton,
} from "./SearchBar.styled";

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
      <Button style={{ marginRight: "0.5rem" }} onClick={onClearClick}>
        <DeleteIcon />
      </Button>
      <SearchButton onClick={onSearchClick}>
        <SearchIcon />
      </SearchButton>
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

export { SearchBar };
