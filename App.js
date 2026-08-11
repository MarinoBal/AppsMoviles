import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';

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
  const [pantallaActual, setPantallaActual] = useState('registro1');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');

  const validarRegistro = () => {
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !password.trim()) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    if (telefono.length !== 10) {
      Alert.alert("Error", "El numero de telefono debe tener 10 digitos.");
      return;
    }

    if (!correo.includes('@') || !correo.includes('.')) {
      Alert.alert("Error", "Por favor, ingrese un correo electrónico valido.");
      return;
    }
    
    if (password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }


    Alert.alert(
      'Registro exitoso',
      `Hola ${nombre}, tu registro ha sido exitoso.`,
      [
        {
          text: 'Continuar',
          onPress: () => {
            setPantallaActual('bienvenida');
          }
        }
      ]
    );
  };

  const iniciarNuevoRegistro = () => {
    setNombre('');
    setCorreo('');
    setTelefono('');
    setPassword('');
    setPantallaActual('registro1');
  };

  if (pantallaActual === 'bienvenida') {
    return (
      <View style={styles.contenedorCentrado}>
        <Text style={styles.tituloPrincipal}>¡Bienvenido, {nombre}!</Text>
        <Text style={styles.subtitulo}>Tu registro ha sido exitoso.</Text>
        
        <View style={styles.botonEspaciado}>
          <Button title="Nuevo registro" onPress={iniciarNuevoRegistro} color="#005691" />
        </View>
      </View>
    );
  }

  return(
    <View style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Registrar Cuenta</Text>

      <Text style={styles.etiqueta}>Nombre Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Julian Quinones"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.etiqueta}>Telefono</Text>
      <TextInput
        style={styles.input}
        placeholder="1234567890"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
        maxLength={10}
      />

      <Text style={styles.etiqueta}>Correo Electronico</Text>
      <TextInput
        style={styles.input}
        placeholder="ejemplo@correo.com"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.etiqueta}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.botonEspaciado}>
        <Button title="Registrar" onPress={validarRegistro} color="#7d0143" />
      </View>

    </View>
  )
}

// ZONA DE ESTILOS (El diseño visual estructurado)
const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f4f7f6',
    paddingTop: 70,
    paddingHorizontal: 25,
  },
  contenedorCentrado: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  botonEspaciado: {
    marginTop: 15,
  }
});