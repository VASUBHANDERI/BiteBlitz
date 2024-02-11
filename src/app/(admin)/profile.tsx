import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { supabase } from "@/lib/supabase";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProvider";
import { Tables } from "@/types";
import { useProfile, useUpdateProfile } from "@/api/profiles";
import Loader from "@/components/Loader";
import { FontAwesome } from "@expo/vector-icons";

const ProfileScreen = () => {
  const { profile } = useAuth();
  const { mutate: updateProfile } = useUpdateProfile();
  const id = String(profile?.id);
  const { data } = useProfile(id);

  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const [full_name, setFullName] = useState(data?.full_name || "");
  const [address, setAddress] = useState(data?.address || "");
  const [mobile, setMobile] = useState(data?.mobile || "");

  const handleSave = async (
    full_name: string,
    address: string,
    mobile: string
  ) => {
    updateProfile({
      id: id,
      updatedFields: { full_name, address, mobile },
    });
  };
  if (!profile) {
    return <Loader />;
  }

  return (
    <View style={styles1.container}>
      <View style={styles1.userInfoCard}>
        <View style={styles1.userLogoView}>
          <Text style={styles1.userLogo}>{data?.full_name?.[0] || "X"}</Text>
        </View>
        <View style={styles1.userInfoView}>
          {!isEditingInfo ? (
            <Text style={styles1.name}>
              {data?.full_name || "Enter Your Name"}
            </Text>
          ) : (
            <TextInput
              style={{
                ...styles1.name,
                borderBottomColor: "gainsboro",
                borderBottomWidth: 1,
              }}
              value={full_name}
              onChangeText={(text) => setFullName(text)}
              editable={isEditingInfo}
            />
          )}
          {!isEditingInfo ? (
            <Text style={styles1.mobile}>{data?.mobile || "9999999999"}</Text>
          ) : (
            <TextInput
              style={{
                ...styles1.mobile,
                borderBottomColor: "gainsboro",
                borderBottomWidth: 1,
              }}
              value={mobile}
              onChangeText={(text) => setMobile(text)}
              editable={isEditingInfo}
              keyboardType="numeric"
            />
          )}
        </View>

        <Pressable
          style={styles1.pencilIconContainer}
          onPress={() => {
            if (!isEditingInfo) {
              setIsEditingInfo(true);
            } else {
              handleSave(full_name, address, mobile);
              setIsEditingInfo(false);
            }
          }}
        >
          {({ pressed }) => (
            <FontAwesome
              name={!isEditingInfo ? "pencil" : "check"}
              size={20}
              color={Colors.light.tint}
              style={{
                opacity: pressed ? 0.5 : 1,
              }}
            />
          )}
        </Pressable>
      </View>
      <View style={styles1.userAddressCard}>
        <View style={styles1.userAddressHeader}>
          <Text style={styles1.userAddressHeading}>Your Address</Text>

          <Pressable
            style={styles1.pencilIconContainer}
            onPress={() => {
              if (!isEditingAddress) {
                setIsEditingAddress(true);
              } else {
                handleSave(full_name, address, mobile);
                setIsEditingAddress(false);
              }
            }}
          >
            {({ pressed }) => (
              <FontAwesome
                name={!isEditingAddress ? "pencil" : "check"}
                size={20}
                color={Colors.light.tint}
                style={{
                  opacity: pressed ? 0.5 : 1,
                }}
              />
            )}
          </Pressable>
        </View>

        {!isEditingAddress ? (
          <Text style={styles1.address}>
            {data?.address || "No Address Provided Yet!"}
          </Text>
        ) : (
          <TextInput
            style={{
              ...styles1.address,
              borderBottomWidth: 1,
              borderBottomColor: "gainsboro",
            }}
            value={address}
            onChangeText={(text) => setAddress(text)}
            editable={isEditingAddress}
            multiline
            numberOfLines={3}
          />
        )}
      </View>

      <Button
        title="Sign Out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

// return (
//   <View style={styles.container}>
//     {/* <Text style={styles.label}>{profile?.email || " No Profile "}</Text> */}
//     <Text style={styles.label}>Full Name:</Text>
//     <TextInput
//       style={styles.input}
//       value={full_name}
//       onChangeText={(text) => setFullName(text)}
//       editable={isEditing}
//     />
//     <Text style={styles.label}>Address:</Text>
//     <TextInput
//       style={styles.input}
//       value={address}
//       onChangeText={(text) => setAddress(text)}
//       editable={isEditing}
//     />
//     <Text style={styles.label}>Mobile Number:</Text>
//     <TextInput
//       style={styles.input}
//       value={mobile.toString()}
//       onChangeText={(text) => setMobile(Number(text))}
//       editable={isEditing}
//     />
//     {isEditing ? (
//       <Button
//         title="Save"
//         onPress={() => {
//           handleSave(full_name, address, mobile);
//         }}
//       />
//     ) : (
//       <Button title="Edit" onPress={() => setIsEditing(true)} />
//     )}
//   </View>
// );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "gainsboro",
  },
  label: {
    color: "gray",
    fontSize: 16,
    marginBottom: 5,
  },
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    padding: 10,
    // backgroundColor: "#fff",
  },
  userInfoCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userAddressCard: {
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userAddressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    margin: -10,
    marginTop: -10,
    borderBottomColor: "gainsboro",
    borderBottomWidth: 1,
  },
  userLogoView: {
    width: 75,
    height: 75,
    backgroundColor: Colors.light.tintBackground,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",

    // marginRight: 10,
  },
  userLogo: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.light.tint,
  },
  userInfoView: {
    flex: 1,
    paddingHorizontal: 10,
    marginLeft: 10,
    marginTop: -5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mobile: {
    fontSize: 16,
    color: "gray",
  },
  pencilIconContainer: {
    padding: 5,
    alignSelf: "flex-start",
    marginTop: -10,
    marginRight: -10,
    borderTopEndRadius: 10,
    borderBottomLeftRadius: 30,
    paddingBottom: 15,
    paddingLeft: 15,
    backgroundColor: Colors.light.tintBackground,
  },

  userAddressHeading: {
    fontSize: 18,
    fontWeight: "500",
  },
  address: {
    marginTop: 20,
  },
});

export default ProfileScreen;
