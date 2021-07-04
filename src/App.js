import React, {Component} from "react";
import axios from 'axios'

class App extends Component{
  constructor(props){
    super(props)
    this.state={
      dataApi:[],
      edit:false,
      dataPost:{
        id:0,
        nama_karyawan:'',
        jabatan:'',
        jenis_kelamin:'',
        tanggal_lahir:''
      }
    }
    this.handleRemove=this.handleRemove.bind(this)
    this.inputChange=this.inputChange.bind(this)
    this.onSubmitForm=this.onSubmitForm.bind(this)
    this.clearData=this.clearData.bind(this)
  }
  
  handleRemove(e){
    console.log(e.target.value)
    fetch(`http://localhost:3004/data-karyawan/${e.target.value}`, {
      method:"DELETE"
    }).then(res => this.reloadData())
  }

  reloadData(){
    axios.get('http://localhost:3004/data-karyawan').then(
      res => {
        this.setState({
          dataApi:res.data
        })
      }
    )
  }

  clearData = () =>{
    let newdataPost = {...this.state.dataPost}
    newdataPost['id'] = ''
    newdataPost['nama_karyawan']=''
    newdataPost['jabatan']=''
    newdataPost['jenis_kelamin']=''
    newdataPost['tanggal_lahir']=''

    this.setState({
      dataPost: newdataPost
    })
  }

  inputChange(e){
    let newdataPost = {...this.state.dataPost}

    if(this.state.edit === false){
      newdataPost['id'] = new Date().getTime()
    }
    newdataPost[e.target.name] = e.target.value
    this.setState({
      dataPost : newdataPost
    }, 
    () => console.log(this.state.dataPost))
  }

  onSubmitForm(){
    if(this.state.edit === false){
      axios
      .post(`http://localhost:3004/data-karyawan`, this.state.dataPost)
      .then ( () => {
          this.reloadData()
          this.clearData()
        }
      )
    }else{
      axios
      .put(`http://localhost:3004/data-karyawan/${this.state.dataPost.id}`, this.state.dataPost)
      .then ( () => {
          this.reloadData()
          this.clearData()
        }
      )
    }
  }

  getDataId = (e) =>{
    axios
    .get(`http://localhost:3004/data-karyawan/${e.target.value}`)
    .then(res => 
      this.setState({
        dataPost: res.data,
        edit: true
      })
    )
  }

  componentDidMount(){
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    //   .then(response => response.json())
    //   .then(res => {
    //     this.setState({
    //       dataApi:res
    //     })
    //   })
    this.reloadData()
    
  }
  render(){
    return(
      <div>
        <row>
          <center>
            <h1 style={{backgroundColor:'Tomato'}}>
              Data Karyawan
            </h1>
          </center>
        </row>

        <row></row>

        <row>
          <input type='text' name='nama_karyawan' placeholder='Masukkan Nama Karyawan' value={this.state.dataPost.nama_karyawan} onChange={this.inputChange} style={{lineHeight:'20px'}}/> {' '}
          <input type='text' name='jabatan' placeholder='Masukkan Jabatan' value={this.state.dataPost.jabatan} onChange={this.inputChange} style={{lineHeight:'20px'}}/> {' '}
          <input type='text' name='jenis_kelamin' placeholder='Masukkan Jenis Kelamin' value={this.state.dataPost.jenis_kelamin} onChange={this.inputChange} style={{lineHeight:'20px'}}/> {' '}
          <input type='date' name='tanggal_lahir' onChange={this.inputChange} value={this.state.dataPost.tanggal_lahir} style={{lineHeight:'20px'}}/> {' '}
          <button type='submit' style={{backgroundColor:'blue', color:'white'}} onClick={this.onSubmitForm}>Save Data</button>
        </row>
        {this.state.dataApi.map((dat, index)=>
          {
            return(
              <div key={index} style={{border:'2px solid black', borderRadius:'25px', padding:'20px', width:'200px', marginTop:'10px'}}>
                <p>
                  Nama : {dat.nama_karyawan}
                </p>
                <p>
                  Jabatan : {dat.jabatan}
                </p>
                <p>
                  Jenis Kelamin : {dat.jenis_kelamin}
                </p>
                <p>
                  Tanggal Lahir : {dat.tanggal_lahir}
                </p>
                <button style={{backgroundColor:'red', color:'white'}} value={dat.id} onClick={this.handleRemove}>Delete</button> {' '}
                <button style={{backgroundColor:'green', color:'white'}} value={dat.id} onClick={this.getDataId}>Edit Data</button>
              </div>
            )
          })}

      </div>
    )
  }
}
export default App;
