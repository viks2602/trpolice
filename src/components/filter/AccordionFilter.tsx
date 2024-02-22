import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import LeadsTable from '../tables/leadstable/LeadsTable';
import SearchableSelect from '../uielements/searchableselect/SearchableSelect';
import { looking_naice_code_Api } from '../../services/zoomInfoApis';
import { MdExpandMore } from "react-icons/md";
interface DataItem {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  validDate: string;
  lastUpdatedDate: string;
  jobTitle: string;
  contactAccuracyScore: number;
  hasEmail: boolean;
  hasSupplementalEmail: boolean;
  hasDirectPhone: boolean;
  hasMobilePhone: boolean;
  hasCompanyIndustry: boolean;
  hasCompanyPhone: boolean;
  hasCompanyStreet: boolean;
  hasCompanyState: boolean;
  hasCompanyZipCode: boolean;
  hasCompanyCountry: boolean;
  hasCompanyRevenue: boolean;
  hasCompanyEmployeeCount: boolean;
  company: {
    id: number;
    name: string;
  };
}




const AccordionFilter = ({data}:any ) => {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);

  

  const handleCompanyChange = (value: string) => () => {
    setSelectedCompanies(prevState => {
      if (prevState.includes(value)) {
        return prevState.filter(item => item !== value);
      } else {
        return [...prevState, value];
      }
    });
  };

  const handleJobTitleChange = (value: string) => () => {
    setSelectedJobTitles(prevState => {
      if (prevState.includes(value)) {
        return prevState.filter(item => item !== value);
      } else {
        return [...prevState, value];
      }
    });
  };
  const handleSelectAll = (category: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    switch (category) {
      case 'Company':
        if (checked) {
          setSelectedCompanies(data.map(item => item.company.name));
        } else {
          setSelectedCompanies([]);
        }
        break;
      case 'Job Title':
        if (checked) {
          setSelectedJobTitles(data.map(item => item.jobTitle));
        } else {
          setSelectedJobTitles([]);
        }
        break;
      default:
        break;
    }
  };

  const selectedValues = {
    companies: selectedCompanies,
    jobTitles: selectedJobTitles,
  };
  const handleSubmit = () => {
    console.log('data filter keys', selectedValues);
  };



  const [codes , setCodes] = useState()
  useEffect(()=>{

    naiceCodes()
  },[])
  const naiceCodes = async () =>{
    console.log('call');
    try {
        const res = await looking_naice_code_Api();
        if(res){
            console.log(res?.data); 
            setCodes(res?.data)  
        }
    } catch (error) {
        console.log(error);
        
    }
  }

  return (
    <div style={{display:'flex',gap:50}} >
    <div style={{width:'15vw'}}>
      <h4>Filter Leads</h4>
      <Accordion>
        <AccordionSummary  expandIcon={<MdExpandMore size={40}/>}>
          {/* <FormControlLabel
            control={<Checkbox checked={selectedCompanies.length === data.length} onChange={handleSelectAll('Company')} />}
            label
          /> */}
          <Typography>Company</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{/* height:100, overflow:'auto', */ display:'flex', flexDirection:'column'}}>
          {/* {data.map(item => (
            <FormControlLabel
              key={item.company.id}
              control={
                <Checkbox
                  checked={selectedCompanies.includes(item.company.name)}
                  onChange={handleCompanyChange(item.company.name)}
                />
              }
              label={item.company.name}
            />
          ))} */}
          <TextField placeholder='company name' size='small'/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<MdExpandMore size={40}/>}>
          <FormControlLabel
            control={<Checkbox checked={selectedJobTitles.length === data.length} onChange={handleSelectAll('Job Title')} />}
            label
          />
          <Typography>Job Title</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{height:100, overflow:'auto', display:'flex', flexDirection:'column'  }}>
          {data.map(item => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checked={selectedJobTitles.includes(item.jobTitle)}
                  onChange={handleJobTitleChange(item.jobTitle)}
                />
              }
              label={item.jobTitle}
            />
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
       <AccordionSummary expandIcon={<MdExpandMore size={40}/>}>
          <Typography>NAICS Code</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <SearchableSelect data={codes}/>
        </AccordionDetails>
      </Accordion>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
    <div>
      <LeadsTable data={data} filterKeys={selectedValues } />
    </div>

      </div>
  );
};

export default AccordionFilter;
