import { Container, Row, Col} from 'react-bootstrap';
import Chart1 from '../../../../components/Chart/Chart1';
import Chart2 from '../../../../components/Chart/Chart2';
import Chart3 from '../../../../components/Chart/Chart3';
import Chart4 from '../../../../components/Chart/Chart4';
import Chart5 from '../../../../components/Chart/Chart5';
import Chart6 from '../../../../components/Chart/Chart6';
import Chart7 from '../../../../components/Chart/Chart7';
import Chart8 from '../../../../components/Chart/Chart8';
import Chart9 from '../../../../components/Chart/Chart9';
import Chart10 from '../../../../components/Chart/Chart10';


function Chart() {
  return (
    <Container fluid>
      <Row>
      <Row>
        <Chart1/><Chart2/><Chart3/><Chart4/>
      </Row>
        <Col>
          <Row>
          <Chart5/>
            <Chart6/>
          </Row>
          <Row>
          <Chart7/>
            <Chart8/>
          </Row>
          <Row>
          <Chart9/>
            <Chart10/>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Chart;