import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../administracion/administracion.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const Administracion = () => {
  const [fechaLlegada, setFechaLlegada] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [totalPago, setTotalPago] = useState("");
  const [stripeToken, setStripeToken] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [idHabitacion, setIdHabitacion] = useState("");

  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [reservationId, setReservationId] = useState("");

  const addReservation = () => {
    Axios.post("http://localhost:3001/createReservation", {
      fecha_llegada: fechaLlegada,
      fecha_salida: fechaSalida,
      total_pago: totalPago,
      stripeToken: stripeToken,
      id_usuario: idUsuario,
      id_habitacion: idHabitacion
    }).then(() => {
      getReservations();
      LimpiarCampos();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html: "<i>La reserva fue registrada con éxito!</i>",
        icon: 'success',
        timer: 3000
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        })
      });
    });
  }

  const updateReservation = () => {
    Axios.put(`http://localhost:3001/updateReservation/${reservationId}`, {
      fecha_llegada: fechaLlegada,
      fecha_salida: fechaSalida,
      total_pago: totalPago,
      stripeToken: stripeToken,
      id_usuario: idUsuario,
      id_habitacion: idHabitacion
    }).then(() => {
      getReservations();
      LimpiarCampos();
      Swal.fire({
        title: "<strong>Actualización exitosa!</strong>",
        html: "<i>La reserva fue actualizada con éxito!</i>",
        icon: 'success',
        timer: 3000
      }).catch(function (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
        })
      });
    });
  }

  const deleteReservation = (reservation) => {
    Swal.fire({
      title: 'Confirmar eliminación?',
      html: "<i>Realmente desea eliminar la reserva?</i>",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/deleteReservation/${reservation.id_reservacion}`).then(() => {
          getReservations();
          LimpiarCampos();
          Swal.fire({
            title: 'La reserva ha sido eliminada',
            showConfirmButton: false,
            icon: 'success',
            timer: 3000
          });
        }).catch(function (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar la reserva',
            footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const LimpiarCampos = () => {
    setFechaLlegada("");
    setFechaSalida("");
    setTotalPago("");
    setStripeToken("");
    setIdUsuario("");
    setIdHabitacion("");
    setEditing(false);
    setReservationId("");
  }

  const getReservations = () => {
    Axios.get("http://localhost:3001/getReservations").then((response) => {
      setReservations(response.data);
    });
  }

  const editReservation = (reservation) => {
    setEditing(true);
    setReservationId(reservation.id_reservacion);
    setFechaLlegada(reservation.fecha_llegada);
    setFechaSalida(reservation.fecha_salida);
    setTotalPago(reservation.total_pago);
    setStripeToken(reservation.stripeToken);
    setIdUsuario(reservation.id_usuario);
    setIdHabitacion(reservation.id_habitacion);
  }

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTION DE RESERVACIONES
        </div>
        <div className="card-body">
        <div className="mb-3">
  <label htmlFor="fechaLlegada" className="form-label">Fecha de Llegada:</label>
  <input type="date" className="form-control" id="fechaLlegada" value={fechaLlegada} onChange={(e) => setFechaLlegada(e.target.value)} />
</div>

<div className="mb-3">
  <label htmlFor="fechaSalida" className="form-label">Fecha de Salida:</label>
  <input type="date" className="form-control" id="fechaSalida" value={fechaSalida} onChange={(e) => setFechaSalida(e.target.value)} />
</div>

<div className="mb-3">
  <label htmlFor="totalPago" className="form-label">Total Pago:</label>
  <input type="number" className="form-control" id="totalPago" value={totalPago} onChange={(e) => setTotalPago(e.target.value)} />
</div>

<div className="mb-3">
  <label htmlFor="stripeToken" className="form-label">Stripe Token:</label>
  <input type="text" className="form-control" id="stripeToken" value={stripeToken} onChange={(e) => setStripeToken(e.target.value)} />
</div>

<div className="mb-3">
  <label htmlFor="idUsuario" className="form-label">ID Usuario:</label>
  <input type="text" className="form-control" id="idUsuario" value={idUsuario} onChange={(e) => setIdUsuario(e.target.value)} />
</div>

<div className="mb-3">
  <label htmlFor="idHabitacion" className="form-label">ID Habitacion:</label>
  <input type="text" className="form-control" id="idHabitacion" value={idHabitacion} onChange={(e) => setIdHabitacion(e.target.value)} />
</div>
        </div>
        <div className="card-footer text-muted">
          {
            editing ?
              <div>
                <button className='btn btn-warning m-2' onClick={updateReservation}>Actualizar</button>
                <button className='btn btn-info m-2' onClick={clearFields}>Cancelar</button>
              </div>
              : <button className='btn btn-success' onClick={addReservation}>Registrar</button>
          }
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Fecha de Llegada</th>
            <th scope="col">Fecha de Salida</th>
            <th scope="col">Total Pago</th>
            <th scope="col">ID Usuario</th>
            <th scope="col">ID Habitacion</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            reservations.map((reservation, key) => {
              return <tr key={reservation.id}>
                <td>{reservation.id}</td>
                <td>{reservation.fecha_llegada}</td>
                <td>{reservation.fecha_salida}</td>
                <td>{reservation.total_pago}</td>
                <td>{reservation.id_usuario}</td>
                <td>{reservation.id_habitacion}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                      onClick={() => {
                        editReservation(reservation)
                      }}
                      className="btn btn-info">Editar</button>
                    <button type="button"
                      onClick={() => {
                        deleteReservation(reservation)
                      }}
                      className="btn btn-danger">Eliminar</button>
                  </div>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
}

export default Administracion;
