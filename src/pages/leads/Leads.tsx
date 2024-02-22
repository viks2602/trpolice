import { useEffect, useState } from 'react'
import { contact_search_Api } from '../../services/zoomInfoApis'
import AccordionFilter from '../../components/filter/AccordionFilter'
import { useSelector } from 'react-redux';
import ExpandableBoxWithAccordions from '../../components/box/ExpandableBoxWithAccordions';
const Leads = () => {
  const naiceCode = useSelector((state:any)=>state.testSlice.naicsCode);
  
  
    const [data , setData] = useState()
    useEffect(()=>{
  console.log(naiceCode[naiceCode.length - 1]?.Id,'naiceCode');

      contacts_lead()
    },[naiceCode])
    const contactSearchBody ={
      "naicsCodes": naiceCode ? `${naiceCode[naiceCode.length - 1]?.Id}` :'11',
      "rpp": 100
    }
    const contacts_lead = async () =>{
      try {
          const res = await contact_search_Api(contactSearchBody);
          if(res){
              setData(res?.data?.data)  
          }
      } catch (error) {
          console.log(error);
          
      }
    }
  return (
    <>
   {data && <AccordionFilter data={data}/>}
    </>
  )
}

export default Leads