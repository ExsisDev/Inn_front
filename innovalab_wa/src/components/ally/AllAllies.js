import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import BackNavigator from '../utilities/backNavigator/BackNavigator';
import SectionTitle from '../utilities/sectionTitle/SectionTitle';
import logoExc from '../../images/exclamación.png';
import './AllAllies.css';

class AllAlies extends React.Component {

    render() {
        const titleProps = {
            text: "Administrar Aliados",
            img: logoExc,
            imgAlt: "logo administrar aliados"
        }
        return (
            <Container className="d-flex flex-column align-items-center px-5">

                    <BackNavigator />
                    <SectionTitle titleProps={titleProps} />
                <Row className="my-3 formBox paddingBox"    >
                    <Table borderless hover>
                        <thead>
                            <tr>
                                <th>Empresa</th>
                                <th>Horas ideación por mes</th>
                                <th>Horas experimentación por mes</th>
                                <th>Ideación por reto</th>
                                <th>Experimentación por reto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td>@fat</td>
                            </tr>                            
                        </tbody>
                    </Table>
                </Row>
            </Container>
        );
    }
}

export default AllAlies;
