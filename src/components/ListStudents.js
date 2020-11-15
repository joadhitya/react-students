import React, { Fragment, useContext, useEffect, useState } from "react";
import { Button, Container, Table } from "reactstrap";
import axios from "axios";
import { AuthContext } from "../App";
import { Link, Redirect } from "react-router-dom";

const api = "http://localhost:5000";
function ListStudents() {
  const [mahasiswa, setMahasiswa] = useState([]);
  const { state, dispatch } = useContext(AuthContext);

  const fetchData = () => {
    var config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + state.token,
      },
    };

    axios
      .get(`${api}/auth/api/v1/admin/mahasiswa`, config)
      .then((res) => {
        setMahasiswa(res.data.value);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const timeoutSession = () => {
    setTimeout(() => {
      console.log("Token Expired")
      dispatch({
        type: "LOGOUT",
      });
    }, state.tokenExpires);
  };

  useEffect(() => {
    fetchData();
    timeoutSession();
    // ESLINT-DISABLED
  }, []);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Fragment>
      <Container>
        <h2>Data Mahasiswa</h2>
        <hr />
        <Table>
          <thead>
            <tr>
              <th>NIM</th>
              <th>Name</th>
              <th>Major</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswa.map((mahasiswa) => (
              <tr key={mahasiswa.id_mahasiswa}>
                <td>{mahasiswa.nim}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.jurusan}</td>
                <td style={{ width: 150 }}>
                  <Link
                    to={{
                      pathname: "/students/edit",
                      state: {
                        id_mahasiswa: mahasiswa.id_mahasiswa,
                        nim: mahasiswa.nim,
                        nama: mahasiswa.nama,
                        jurusan: mahasiswa.jurusan,
                      },
                    }}
                  >
                    <Button size="sm" color="primary" className="mr-2">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    onClick={() => this.deleteStudent(mahasiswa.id_mahasiswa)}
                    size="sm"
                    color="danger"
                    className="mr-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Fragment>
  );
}

export default ListStudents;
