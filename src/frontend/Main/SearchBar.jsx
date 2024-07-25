import { Search } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import './Search.css'
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
export default function SearchBar(){
    const [input, setInput]= useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    //fetching the data from chemical app
    const fethchingData = async (value) =>{
        if (!value) 
            return;
        try {
            const res = await axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${value}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`);

            if (res.data && res.data.PropertyTable && Array.isArray(res.data.PropertyTable.Properties)) {
              setData(res.data.PropertyTable.Properties);
              setError(null);
            } else {
              setError('No such component.');
              setData([]);
            }
          } catch (error) {
            console.error(error);
            setError("Fetch error");
            setData([]);
          }
        };
      
    const handleChange = (e) =>{
        fethchingData(e.target.value.trim());
        setInput(e.target.value.trim());
    };
//handle adding to table:
    const handleClick = (e) => {

    }

    return(

        <div>
            <InputGroup size="lg">
        <InputGroup.Text id="basic-addon1">
            <Search />
        </InputGroup.Text>
        <Form.Control
            type="text"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            value={input}
            onChange={handleChange}

        />
    </InputGroup>
    <Card style={{ width: '100%', backgroundColor:'lightgrey', color:'black', fontSize: '2vh'}} 
    
    >
        <ListGroup.Item onClick={handleClick}>
        {error && <p>{error}</p>}
        {Array.isArray(data) && data.length > 0 ? (
          <div>
            {data.map((compound, index) => (
              <div key={index}>
                <p><strong>Compound:</strong> {compound.IUPACName}</p>
              </div>
            ))}
          </div>
        )
        :
        (!Array.isArray(data) && <p>No valid data available</p>)}

        </ListGroup.Item>
    
        

    </Card>
</div>        
      

);
}