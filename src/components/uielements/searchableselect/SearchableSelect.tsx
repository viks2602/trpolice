import React, { useState, useEffect } from 'react';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux'
import { changeNaicsCode } from '../../../redux/features/testSlice';
const SearchableSelect = ({ data }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const debouncedSearchTerm = useDebouncedSearch(searchTerm);

  const filteredOptions = data?.filter(option =>
    option.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || option.Id.includes(debouncedSearchTerm)
  );

  const handleChange = (event) => {
    setSelectedIds(event.target.value);
  };

  const handleToggle = (value) => () => {
    const currentIndex = selectedIds.indexOf(value);
    const newChecked = [...selectedIds];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedIds(newChecked);
  };

  const handleApply = () => {
    const selectedData = data?.filter(item => selectedIds.includes(item.Id));
    console.log(selectedData);
    dispatch(changeNaicsCode(selectedData))
  };

  const renderRow = ({ index, style }) => {
    const option = filteredOptions[index];
    return (
      <MenuItem key={option.Id} value={option.Id} style={style}>
        <Checkbox
          edge="start"
          checked={selectedIds.indexOf(option.Id) !== -1}
          tabIndex={-1}
          disableRipple
          onClick={handleToggle(option.Id)}
        />
        <ListItemText primary={`${option.Id} - ${option.Name}`} />
      </MenuItem>
    );
  };

  function useDebouncedSearch(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = debounce(() => setDebouncedValue(value), delay);
      handler();
      return () => {
        handler.cancel();
      };
    }, [value, delay]);

    return debouncedValue;
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}> {/* Adjust the max-width and margin as needed */}
      <FormControl fullWidth>
        <InputLabel id="searchable-select-label">Select Options</InputLabel>
        <Select
          multiple
          labelId="searchable-select-label"
          id="searchable-select"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          value={selectedIds}
          onChange={handleChange}
          input={<OutlinedInput label="Select Options" />}
          renderValue={(selected) => selected.map((id) => `${id} - ${data?.find(option => option.Id === id)?.Name}`).join(', ')}
          MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
        >
          <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            label="Search"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
          <List
            height={200}
            itemCount={filteredOptions?.length}
            itemSize={48}
            width="100%"
          >
            {renderRow}
          </List>
        </Select>
        <Button onClick={handleApply} variant="contained" color="primary" style={{ marginTop: '10px' }}>
          Apply
        </Button>
      </FormControl>
    </div>
  );
};

export default SearchableSelect;


