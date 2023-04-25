import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Collapse,Paper,Tooltip,Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function SearchResults(props) {
  const [selectedOption, setSelectedOption] = React.useState('option1');
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell align="left">Score</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="center">Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map(({id,rank,score,title,description},index) => (
            <StyledTableRow key={index}>
              <StyledTableCell align="left">{index+1}</StyledTableCell>
              <StyledTableCell align="left">{score}</StyledTableCell>
              <StyledTableCell align="left">{title}</StyledTableCell>
              <StyledTableCell align="left">
              <Collapse in={expanded} timeout="auto" unmountOnExit></Collapse>
              <Typography variant="body2" style={{ height:'50px',maxWidth: "600px",textOverflowY:'ellipsis'}} noWrap={true}>{description}</Typography>
              </StyledTableCell>
              <StyledTableCell>
                <ButtonGroup size="small" aria-label="small button group">
                  <Link to={`/edit/${id}`}>
                    <Tooltip title="View">
                      <Button key="one" style={{color:'black'}}><VisibilityIcon></VisibilityIcon></Button>
                    </Tooltip>
                  </Link>
                  <Link>
                    <Tooltip title={`/edit/${id}`}>
                      <Button key="three" style={{color:'black'}}><EditIcon></EditIcon></Button>
                    </Tooltip>
                  </Link>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
