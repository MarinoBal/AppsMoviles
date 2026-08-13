import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList, Image, Alert, ActivityIndicator } from 'react-native';

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('Registro');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  // useEffect para ejecutar la descarga inicial
  useEffect(() => {
    descargarEmpleados();
  }, []);

  const descargarEmpleados = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=5');
      const datos = await response.json();
      setEmpleados(datos.results);
      setCargando(false);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron descargar los empleados');
      setCargando(false);
    }
  };


  const agregarEmpleadoManual = () => {
    if (nombre.trim() === '' || email.trim() === '' || telefono.trim() === '') {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    if (telefono.trim().length < 10) {
      Alert.alert('Error', 'El número de teléfono debe tener al menos 10 dígitos');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico valido.");
      return;
    }

    const nuevoEmpleado = {
      id: Date.now().toString(),
      name: { first: nombre },
      email: email,
      telefono: telefono,
      foto:'https://i.pravatar.cc/150?u=${Date.now()}' 
    };

    setEmpleados([...empleados, nuevoEmpleado]);
    Alert.alert('Éxito', 'Empleado agregado correctamente');

    setNombre('');
    setEmail('');
    setTelefono('');
  }

  // Pantallas y renderizado 
  //carga
  if (cargando) {
    return (
      <View style={styles.pantallaCentrada}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.textoCarga}>Cargando empleados...</Text>
      </View>
    );
  }
 

  //lista de empleados
  if (pantallaActual === 'Lista') {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.tituloPrincipal}>Lista de Empleados</Text>
        <View style={styles.espaciadoBoton}>
          <Button title="Volver a Registro" onPress={() => setPantallaActual('Registro')} />
        </View>
        <FlatList
          data={empleados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarjetaUsuario}>
              <Image source={{ uri: item.foto }} style={styles.imagenPerfil} />
              <View style={styles.infoUsuario}>
                <Text style={styles.nombreUsuario}>{item.name.first}</Text>
                <Text style={styles.textoDetalle}>{item.email}</Text>
                <Text style={styles.textoDetalle}>{item.telefono || 'Sin teléfono'}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  
  //pantalla de registro
  return (
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Nuevo Ingreso</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
      
      {}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Teléfono (10 dígitos)"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="numeric"
        maxLength={10}
      />

      <View style={styles.espaciadoBoton}>
        <Button 
          title="Agregar Empleado" 
          color="green" 
          onPress={agregarEmpleadoManual} 
        />
      </View>

      <View style={styles.espaciadoBoton}>
        <Button 
          title="Ver Lista de Empleados" 
          color="blue" 
          onPress={() => setPantallaActual('Lista')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 60,
    paddingHorizontal: 20
  },
  pantallaCentrada: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  textoCarga: {
    marginTop: 15,
    fontSize: 16,
    color: '#555'
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center'
  },
  etiqueta: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 45,
    marginBottom: 15
  },
  espaciadoBoton: {
    marginBottom: 15
  },
  tarjetaUsuario: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  imagenPerfil: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15
  },
  infoUsuario: {
    flex: 1,
    justifyContent: 'center'
  },
  nombreUsuario: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222'
  },
  textoDetalle: {
    fontSize: 14,
    color: '#555',
    marginTop: 3
  }
});