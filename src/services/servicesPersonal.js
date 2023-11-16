import axios from 'axios'

const uri = 'http://200.12.136.74:4000/biometrico'


export const traerDatosPeronalHR = async (fecha, claustro) => {
    try {

        const resu = await axios.get(`${uri}/horasregistros/${fecha}/${claustro}`)
        //console.log(resu.data)
        return resu.data
    } catch (error) {
        console.log(error)
    }
}

