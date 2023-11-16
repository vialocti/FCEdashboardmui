import { useState, useEffect } from 'react'
import axios from 'axios'


export const usePageInicial = (anio) => {
    //const anio='2022'
    //const uri_e = 'http://localhost:5000/dbegresados'
    //const uri_i = 'http://localhost:5000/dbinscriptos'
    //const uri_a = 'http://localhost:5000/alutivos'

    const uri_e = 'http://200.12.136.75:5000/dbegresados'
    const uri_i = 'http://200.12.136.75:5000/dbinscriptos'
    const uri_a = 'http://200.12.136.75:5000/alutivos'

    //const uri_c = 'http://200.12.136.75:5000/cursadas'

    const uri_bio = 'http://200.12.136.74:4000/biometrico'

    //const [cantidadI, setCantidadI] = useState(0)
    const [cantidadSedeEgr, setCantidadEgr] = useState(null)
    const [cantidadAlu, setCantidadAlu] = useState(null)
    const [cantidadInsc, setCantidadInsc] = useState(null)
    const [cantidadAluPro, setCantidadAluPro] = useState(null)
    const [datosAsistencia, setDatosAsistencia] = useState(null)

    const [cantidadInscPeriodo, setCantidadInscPeriodo] = useState(null)
    //const [cantidadComiAnio, setCantidadComiAnio] = useState(null)

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {

        traerInscriptosSede(anio)
        traerCantidadPorSede(anio)
        traerAlumnosActivosSede()
        traerAlumnosCarrera()
        traerAsistencia()
        traerCantidadPorPeriodos()
        //traerComisionesAnio(anio)
    }, [anio])

    //egresados anio en curso
    const traerCantidadPorSede = async () => {
        //console.log(`${uri}/inscrTotalIngreso/${anio}`)
        try {
            const rows = await axios.get(`${uri_e}/egresadosanio/${anio}/L`)
            setCantidadEgr(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    //inscripciones
    const traerInscriptosSede = async () => {
        try {
            const rows = await axios.get(`${uri_i}/inscriptosSedeanio/${anio + 1}`)
            setCantidadInsc(rows.data)
        } catch (err) {
            setError(err)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }


    //cantidad por periodos
    const traerCantidadPorPeriodos = async () => {

        try {
            const rows = await axios.get(`${uri_i}/inscriptosperiodo/${anio + 1}`)
            //console.log(rows)
            setCantidadInscPeriodo(rows.data)
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }


    const traerAlumnosActivosSede = async () => {
        try {
            const rows = await axios.get(`${uri_a}/alumnosSede`)
            setCantidadAlu(rows.data)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    //por carrera
    const traerAlumnosCarrera = async () => {
        try {
            const rows = await axios.get(`${uri_a}/alumsactpro`)
            setCantidadAluPro(rows.data)
        } catch (error) {
            console.log(error)
        }
    }


    //asistencia
    const traerAsistencia = async () => {

        let fc = new Date()
        let anio = fc.getFullYear()
        let mes = fc.getMonth() < 10 ? '0' + (fc.getMonth() + 1) : + (fc.getMonth() + 1)
        let dia = fc.getDate() < 10 ? '0' + fc.getDate() : fc.getDate()

        let fecha = anio + '-' + mes + '-' + dia

        //console.log(`${uri_bio}/asistenciahoy/${fecha}`)
        try {
            const resu = await axios.get(`${uri_bio}/asistenciahoy/${fecha}`)
            //console.log(resu.data)
            setDatosAsistencia(resu.data)
        } catch (error) {
            setError(error)
            console.log(error)
        }
    }

    //comisiones de cursadas en año lectico
    //no utilizado por ahora
    /*
    const traerComisionesAnio = async () => {
        try {
            const rows = await axios.get(`${uri_c}/comisionesanio/${anio}`)
            setCantidadComiAnio(rows.data)
        } catch (error) {
            )
        }
    }
   */
    return { loading, error, cantidadSedeEgr, cantidadInsc, cantidadAlu, cantidadAluPro, datosAsistencia, cantidadInscPeriodo }
}
