import React from 'react';
import { useState, useEffect } from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import { Chart } from 'chart.js';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import faker from 'faker';
import { AiOutlineUsergroupAdd, AiOutlineDollar } from 'react-icons/ai';
import './Users/clist.scss';
import { FaDolly } from 'react-icons/fa';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

const labels1 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'];


export const graphoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Total Revenue By Year',
    },
  },
};
const HomePage = props => {
  const [activeNav, setActiveNav] = React.useState(1);
   const [graphdata,setGraphData] =useState({
      labels,
      datasets: [
        {
          label: 'Total Month Income',
          data: [],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }
        // {
        //   label: 'Dataset 2',
        //   data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
        //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
        // },
      ],
    
   }) 
  const [revenue, setRevenue] = React.useState();
  const [revenuegraph,setRevenueGraph]=useState()
  const [chartExample1Data, setChartExample1Data] = React.useState('data1');
  const [data, setData] = useState({
    labels: [],

    datasets: [
      {
        label: 'Month Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });
  const [data1, setData1] = useState({
    labels: [],
    datasets: [
      {
        label: 'Month Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });
  const [data2, setData2] = useState({
    labels: [],
    datasets: [
      {
        label: 'Month Data',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [],
      },
    ],
  });

  useEffect(() => {
    let mounted = true;
    var decoded = jwt_decode(localStorage.getItem('token'));

    setUser(decoded.result);
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };

    axios
      .get('https://api.mazglobal.co.uk/maz-api/orders/month/month', config)
      .then(res=>{
           setRevenue(res.data.data)
          
      }).catch(err=>console.log(err))

      let gdata={
        labels,
        datasets:[
          {
      label: 'Total Month Income',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
          }
  ],
}
        axios
        .get('https://api.mazglobal.co.uk/maz-api/orders/month/allMonths', config)
        .then(res=>{
          let list=[]
          res.data.data.map((data)=>{
             labels.map((lb,key) =>{
      
              if(data.MonthName==key+1)
              {
                gdata.datasets[0].data[key]=data.Profits
                //faker.datatype.number({ min: 0, max: data.Profits })
              }
             
            })
           // graphdata.datasets[0].data[key]=rvnu
            
          })
            console.log('graph data',gdata.datasets[0].data)
          setGraphData(gdata)
        }).catch(err=>console.log(err))
      

   
    //getting categories from database..
    let list = data;
    // axios
    //   .get('http://95.111.240.143:8080/ecom-api/orders/month/month', config)
    //   .then(response => {
    //     response.data.data.map((exam, i) => {
    //       let count = 1;
    //       let status = false;
    //       let date = '';
    //       const d = new Date(exam.date);
    //       let dd = d.toString();
    //       for (let i = 0; i < 15; i++) {
    //         date = date + dd[i];
    //       }
    //       exam.date = date;
    //       exam['date'] = date;
    //       for (let j = 0; j < i; j++) {
    //         if (response.data.data[j].date == date) {
    //           list.datasets[0].data[j] = list.datasets[0].data[j] + 1;
    //           status = true;
    //         }
    //       }

    //       if (status == false) {
    //         list.labels.push(date);
    //         list.datasets[0].data.push(count);
    //       }
    //     });

    //     setData(list);
    //     setData1(list);
    //   })
    //   .catch(err => console.log(err));

    // axios
    //   .get(
    //     'http://95.111.240.143:8080/ecom-api/orders/month/currentWeek',
    //     config,
    //   )
    //   .then(res => {
    //     let list1 = data2;
    //     res.data.data.map(ex => {
    //       let date = '';
    //       const d = new Date(ex.date);
    //       let dd = d.toString();
    //       for (let i = 0; i < 15; i++) date = date + dd[i];
    //       ex.date = date;
    //       ex['date'] = date;

    //       list1.labels.push(date);

    //       list1.datasets[0].data.push(ex.total_items);
    //     });

    //     setData2(list1);
    //   })
    //   .catch(err => console.log(err));
    //return () => mounted = false;
  }, []);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    if (index == 1) {
      setData(data1);
    } else {
      setData(data2);
    }
  };

  return (
    <>
    {user.role_id==1 ?
    <div>
      <div className="containerspaceee">
        
        <div className="row">
          <div className="col-lg-4">
            <div className="all-icome">
              <div className="income-info">
                <h2> Total Income</h2>
                <p> {revenue?revenue.Profits:''}</p>
              </div>

              <div className="icon-box">
                <AiOutlineDollar className="icons-size" />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="all-user">
              <div className="income-info">
                <h2> All Users</h2>
                <p> 100</p>
              </div>

              <div className="icon-box">
                <AiOutlineUsergroupAdd className="icons-size" />
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="income-box">
              <div className="income-info">
                <h2> Total Orders</h2>
                <p>{revenue?revenue.total:''}</p>
              </div>

              <div className="icon-box">
                <FaDolly className="icons-size" />
              </div>
            </div>
          </div>
        </div>
        <div className="spaceee"> </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="bar-box">
              <div className="income-info bar">
                <h2> Summary</h2>
              </div>
              <div className="bar-space">
                {graphdata &&
                <Bar options={graphoptions} data={graphdata} />
                }
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="bar-box">
              <div className="income-info bar">
                <h2> Top Selling Brands</h2>
              </div>
              <div className="top-ppoints">
                <div className='same-line  '>
                <h5> J.</h5>   <p>  255160 Rs </p>  </div>
                <div className='same-line  '>  <h5> Maheen Zaib</h5>  <p>  1114000 Rs </p> </div>
                <div className='same-line  '>  <h5> Luxiro</h5><p>  112000 Rs</p>  </div>
                <div className='same-line  '>  <h5> Silk Route </h5><p>  800012 Rs</p> </div>
                <div className='same-line  '>  <h5> Pernia Friend </h5><p>  75212 Rs</p> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 1,
                          })}
                          href="#pablo"
                          onClick={e => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">Month</span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames('py-2 px-3', {
                            active: activeNav === 2,
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={e => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">Week</span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Line
                    data={graphdata ? graphdata : []}
                    width={400}
                    height={300}
                  />
                </div>
                {/* <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={(e) => console.log(e)}
                  />
                </div> */}
              </CardBody>
            </Card>
          </Col>
          {/* <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">
                      Performance
                    </h6>
                    <h2 className="mb-0">Total orders</h2>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart">
                  <Bar
                    data={data ? data : []}
                    width={400}
                    height={600}
                    options={{
                      maintainAspectRatio: false,
                    }}
                  />
                </div>

              </CardBody>
            </Card>
          </Col> */}
        </Row>
       
      </Container>
      </div>:
      <h3>Dashboard</h3>
        }
    </>
  );
};

//Dashboard.layout = Admin;

export default HomePage;
