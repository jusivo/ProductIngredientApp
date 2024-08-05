import { Search } from 'react-bootstrap-icons';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid'; 
import Table from 'react-bootstrap/Table';
import './Search.css'
import { useEffect, useState } from 'react';
export default function SearchBar(){
    const [input, setInput]= useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    
    //fetching the data from chemical app
    const fethchingData = async (value) =>{
        if (!value) 
            return;
        try {
            const res = await axios.get(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${value}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`);

            if (res.data && res.data.PropertyTable && Array.isArray(res.data.PropertyTable.Properties)) {
              setData(res.data.PropertyTable.Properties.map((compound, ind) => ({
                ...compound,
                //creates custom id for item:
                id: uuidv4(),
              })));
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
    const handleClick = (compound) => {
      const items  = [...selectedItems, compound];
      if (!compound.id) {
        console.error("Compound does not have an id:", compound);
        return;
      }
      setSelectedItems(items);
      localStorage.setItem("items", JSON.stringify(items));
    }
    //for handling remove process from table:
    const handleRemove = (id) =>{
      if(!id){
        console.log("Undefined id");
        return;

      }
      console.log("Removing item with id:", id);
      setSelectedItems((prevItems) => prevItems.filter(item => item.id !== id ));      
    }
    //getting items from local storage:
    useEffect(()=>{
      const storedItems = localStorage.getItem("items");
      if(storedItems){
        setSelectedItems(JSON.parse(storedItems));
      }
    })

    return(

        <div>
          <div className='searchBar'>
          <InputGroup size="lg" >
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

          </div>
          {error && <p>{error}</p>}
        {Array.isArray(data) && data.length > 0 ? (
          <div className='searchDiv'>
          
            <Search />
       
            {data.map((compound, ind) => (
              <div key={compound.id || ind} onClick={()=> handleClick(compound)}>
                <p><strong>Compound:</strong> {compound.IUPACName}</p>
                
              </div>
              
            ))}

          </div>
        )
        :
        (!Array.isArray(data) && <p>No valid data available</p>)}
        <Table striped bordered hover color='grey' className='tableAlign'>
        <thead>
        <tr>
          <th>#</th>
          <th>Molecular formula</th>
          <th>IUPAC name</th>
          <th>Molecular weight</th>
          <th>Remove Item</th>
        </tr>
      </thead>
      <tbody >
        {selectedItems.map((item, ind) => (
          <tr key={item.id}>
            <td>{ind + 1}</td>
              <td>{item.MolecularFormula}</td>
              <td>{item.IUPACName}</td>
              <td>{item.MolecularWeight}</td>
              <td>
              <Button variant="danger" onClick={() => handleRemove(item.id)}>Remove</Button>{' '}
              </td>
          </tr>
        ))}

      </tbody>
      </Table>
     
        </div>        
      

);
}