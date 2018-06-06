import React, {Component} from 'react';
import {
    Badge,
    Card,
    CardBody,
    CardHeader,
    CardColumns,
    Col,
    Row,
    Table,
    Pagination,
    PaginationItem,
    PaginationLink,
    FormGroup,
    Label,
    Input,
    Form,
    FormText,
    CardFooter,
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody
} from 'reactstrap';
import {Tracker} from 'meteor/tracker'
import $ from 'jquery'
import NotificationAlert from "react-notification-alert";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';

const generatorRandomNumber = (length, min, max) => {
    let result = []
    for(i = 0; i < length; i++){
        result.push(Math.floor(Math.random() * (max - min) + min))
    }
    return result;
}

const options = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false
}

const line = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
    datasets: [
      {
        label: 'Số sản phẩm đăng ký',
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
        data: generatorRandomNumber(4,10,100),
      },
    ],
  };
  
  const bar = {
    labels:  ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4'],
    datasets: [
      {
        label: 'Sản phẩm kiểm tra',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: generatorRandomNumber(4,10,20),
      },
    ],
  };
  
  const doughnut = {
    labels: [
      'Không đạt',
      'Đạt',
    ],
    datasets: [
      {
        data: generatorRandomNumber(2,0,100),
        backgroundColor: [
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FFCE56',
        ],
      }],
  };
  
  
  const pie = {
    labels: [
      'Cá hộp',
      'Cá viên',
      'Cá tươi',
    ],
    datasets: [
      {
        data: generatorRandomNumber(3,40,60),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
        ],
      }],
  };
  


class KiemTraSanPhamForm extends Component {
    constructor(props) {
        super(props);
    }


    renderBieuDo = () => {

        return (
            <Card>
                <CardHeader>
                    <strong>Chi tiết kế hoạch kiểm tra sản phảm</strong>
                </CardHeader>
                <CardBody>
                <CardColumns className="cols-2">
          <Card>
            <CardHeader>
              Số sản phẩm đăng ký
              <div className="card-header-actions">
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Sản phẩm kiểm tra
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Bar data={bar} options={options} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Loại sản phẩm đăng ký
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              Kết quả kiểm tra
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
            </CardBody>
          </Card>

        </CardColumns>
                </CardBody>
            </Card>)
    }

    

    render() {
        return (
            <div className="animated fadeIn">
                <NotificationAlert ref="notify" />
                <Row>
                    <Col ls="1">
                        <Card>
                            <CardHeader>
                                Thời gian báo cáo
                            </CardHeader>
                            <CardBody>
                            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
 
                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày bắt đầu</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayBatDau" name="date-input" defaultValue={moment().format("YYYY-MM-DD")}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col md="3">
                                <Label htmlFor="date-input">Ngày kết thúc </Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="dpNgayKetThuc" name="date-input" defaultValue={moment().format("YYYY-MM-DD")}/>
                            </Col>
                        </FormGroup>

                        <Button type="submit" size="sm" color="primary"><i
                            className="fa fa-dot-circle-o"></i> Hiển thị</Button>
                    </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col ls="2">
                        {this.renderBieuDo()}
                    </Col>
                </Row>
            </div>
        );
    }


}

export default KiemTraSanPhamForm;