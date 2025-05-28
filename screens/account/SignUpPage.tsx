import { PrimaryButton, SecondaryButton } from "@/components/ui/buttons";
import { IconSymbol } from "@/components/ui/IconSymbol";
import Spacer from "@/components/ui/spacer";
import { useSession } from "@/lib/SessionProvider";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LOGIN_SCHEMA } from "@/lib/schema";
import { useState, useEffect } from "react";
import { Image } from "expo-image";

// Define the form data type
type FormData = {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpPage() {
  const {
    signUp,
    status,
    showEmailConfirmOTPInput,
    confirmSignUp,
    cancelSignUpConfirmation,
  } = useSession();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(LOGIN_SCHEMA),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const onSubmit = async (data: FormData) => {
    Keyboard.dismiss();
    if (!passwordMatch) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }
    try {
      await signUp(data.email, data.password);
    } catch (error) {
      console.log("ERROR", error);
      Alert.alert(`Sign Up Error ${error}`);
    }
  };

  const submitOtp = async () => {
    Keyboard.dismiss();
    try {
      await confirmSignUp(otp);
      console.log("REDIRECTING TO HOME");
      router.replace("/(tabs)");
    } catch (error) {
      console.log("ERROR", error);
      Alert.alert(`SUBMIT OTP Error ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("@/assets/images/icon.png")}
        style={styles.logo}
        contentFit="contain"
      />
      <Text style={styles.title}>
        Welcome to{"\n"}
        <Text style={styles.titleHighlight}>Medivery!</Text>
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <IconSymbol name="person" color={"#6B7280"} />
            <TextInput
              placeholder="Name"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              placeholderTextColor={"grey"}
            />
          </InputWrapper>
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <IconSymbol name="call" color={"#6B7280"} />
            <TextInput
              placeholder="Phone Number"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              placeholderTextColor={"grey"}
            />
          </InputWrapper>
        )}
      />
      {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber.message}</Text>}

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <IconSymbol name="mail" color={"#6B7280"} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoComplete="email"
              autoCapitalize="none"
              placeholderTextColor={"grey"}
            />
          </InputWrapper>
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <IconSymbol name="lock" color={"#6B7280"} />
            <TextInput
              placeholder="Password"
              autoComplete="password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholderTextColor={"grey"}
            />
          </InputWrapper>
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <InputWrapper>
            <IconSymbol name="lock" color={"#6B7280"} />
            <TextInput
              placeholder="Confirm Password"
              autoComplete="password"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholderTextColor={"grey"}
            />
          </InputWrapper>
        )}
      />
      {!passwordMatch && <Text style={styles.error}>Passwords do not match.</Text>}

      <Spacer width={"100%"} height={16} />

      <PrimaryButton onPress={handleSubmit(onSubmit)} title="Sign Up" />

      <Spacer width={"100%"} height={8} />

      <View style={{ flexDirection: "row" }}>
        <Text>Already registered? </Text>
        <SecondaryButton
          onPress={() => {
            Keyboard.dismiss();
            router.replace("/sign-in");
          }}
          title="Log In"
          textStyle={{
            textDecorationLine: "underline",
          }}
        />
      </View>

      {status === "loading" && <ActivityIndicator style={{ padding: 20 }} />}

      <Modal
        animationType="slide"
        transparent={true}
        visible={showEmailConfirmOTPInput}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 18, marginBottom: 16 }}>
              Check your email for an OTP
            </Text>
            <InputWrapper>
              <TextInput
                placeholder="Verification OTP"
                autoComplete="one-time-code"
                style={styles.input}
                onChangeText={(e) => setOtp(e)}
                value={otp}
                placeholderTextColor={"grey"}
              />
            </InputWrapper>

            <View style={{ flex: 1 }} />

            <PrimaryButton onPress={submitOtp} title="Submit" />
            <SecondaryButton
              onPress={() => {
                Keyboard.dismiss();
                cancelSignUpConfirmation();
              }}
              title="Cancel"
              textStyle={{
                textDecorationLine: "underline",
              }}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

function InputWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.inputWrapper}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  titleHighlight: {
    color: "#4CAF50",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
});