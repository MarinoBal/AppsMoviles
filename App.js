import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Image } from 'react-native';

// Importamos los componentes preconstruidos de React Native
import { 
  StyleSheet,       // Para crear los estilos (es el motor de CSS de React Native).
  Text,             // Para mostrar cualquier texto en pantalla.
  View,             // El contenedor principal .
  TextInput,        // La caja donde el usuario escribe (equivalente a <input type="text">).
  Button,           // Un botón nativo.
  FlatList,         // Una lista inteligente que solo renderiza los elementos que caben en pantalla.
  TouchableOpacity  // Un contenedor que hace que su contenido reaccione al toque oscureciéndose.
} from 'react-native';

// FUNCIÓN PRINCIPAL El componente que representa la pantalla entera
export default function App() {
  // NOTA: Estas son las líneas ocultas (6-19) necesarias para que la lógica funcione
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    descargarUsuarios();
  }, []);

  const descargarUsuarios = async () => {
    try {
      // Hacemos la petición a la base de datos pública (pedimos 10 usuarios)
      const respuesta = await fetch('https://randomuser.me/api/?results=10');
      // Convertimos la respuesta a formato JSON
      const json = await respuesta.json();

      // Guardamos la lista de usuarios en la memoria de la app
      setUsuarios(json.results);
      // Apagamos la ruedita de carga
      setCargando(false);
    } catch (error) {
      console.error("Hubo un problema descargando los datos: ", error);
      setCargando(false);
    }
  };

  // PANTALLA DE CARGA (Renderizado condicional)
  // Si 'cargando' es true, mostramos una ruedita nativa del celular
  if (cargando) {
    return (
      <View style={styles.pantallaCentrada}>
        <ActivityIndicator size="large" color="#005691" />
        <Text style={styles.textoCarga}>Descargando perfiles...</Text>
      </View>
    );
  }


  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Directorio Global</Text>

      <FlatList
        data={usuarios}
      
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.tarjetaUsuario}>

            {/* Nuevo Componente: Image.
                Para imágenes de internet, se usa la propiedad 'uri' (Uniform Resource Identifier) */}
            <Image
              source={{ uri: item.picture.large }}
              style={styles.imagenPerfil}
            />

            <View style={styles.infoUsuario}>
              <Text style={styles.nombreUsuario}>
                {item.name.first} {item.name.last}
              </Text>
              <Text style={styles.correoUsuario}>{item.email}</Text>
              <Text style={styles.paisUsuario}>{item.location.country}</Text>
            </View>

          </View>
        )}
      />
    </View>
  )
}

// ESTILOS VISUALES
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  pantallaCentrada: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  textoCarga: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  tituloPrincipal: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  tarjetaUsuario: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagenPerfil: {
    width: 70,
    height: 70,
    borderRadius: 35, 
    marginRight: 15,
  },
  infoUsuario: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 30,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444444',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 15,
    fontSize: 16,
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  correoUsuario: {
    fontSize: 14,
    color: '#005691',
    marginBottom: 4,
  },
  paisUsuario: {
    fontSize: 14,
    color: '#777',
  }
});