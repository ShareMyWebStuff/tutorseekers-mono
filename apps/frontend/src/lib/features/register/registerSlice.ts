import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IRegisterEmail {
  // email: string | null;
  // password: string | null;
  // confirm: string | null;
  // googleEmail: string | null;
  googleAcc: boolean;
  // googleId: string | null;
  token: string | null;
  firstname: string;
  lastname: string;
  preferredName: string;
  emailVerify: boolean;
}

export interface IRegisterAccountType {
  accountType: string;
}

export interface IRegisterTutor {
  title: "ns" | "miss" | "mrs" | "ms" | "mr" | "mx" | "dr" | "prof";
  firstname: string;
  lastname: string;
  gender: "ns" | "f" | "m" | "p";
  preferredName: string;
  phone: string;
  mobile: string;
  address1: string;
  address2: string;
  town: string;
  county: string;
  postcode: string;
}

export interface IRegisterParent {
  preferredName: string;
  town: string;
  postcode: string;
}

export interface IRegisterStudent {
  preferredName: string;
  town: string;
  postcode: string;
}

export interface IRegisterChecks {
  emailVerify: boolean;
  readSafeguarding: boolean;
  over18: boolean;
  rightToWork: boolean;
  onlyAccount: boolean;
  agreeTerms: boolean;
}

// export interface IRegisterStep3 {
//     step: number;
//     address1: string;
//     address2: string;
//     town: string;
//     county: string;
//     postcode: string;
// }

// export interface IRegisterState extends IRegisterStep, IRegisterStep1, IRegisterStep2, IRegisterStep3 { }
export interface IRegisterState
  extends IRegisterEmail,
    IRegisterAccountType,
    IRegisterTutor,
    IRegisterChecks {}

const initialState: IRegisterState = {
  token: null,
  // email: "",
  // password: "",
  // confirm: "",
  // googleEmail: "",
  googleAcc: false,
  // googleId: "",

  accountType: "Select account type",
  title: "ns",
  firstname: "",
  lastname: "",
  gender: "ns",
  preferredName: "",
  phone: "",
  mobile: "",
  address1: "",
  address2: "",
  town: "",
  county: "",
  postcode: "",

  emailVerify: false,
  readSafeguarding: false,
  over18: false,
  rightToWork: false,
  onlyAccount: false,
  agreeTerms: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterEmail: (state, action: PayloadAction<IRegisterEmail>) => {
      state.token = action.payload.token;
      state.googleAcc = action.payload.googleAcc;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.preferredName = action.payload.preferredName;
      state.emailVerify = action.payload.emailVerify;
    },
    setAccountType: (state, action: PayloadAction<IRegisterAccountType>) => {
      state.accountType = action.payload.accountType;
    },
    setTutorDetails: (state, action: PayloadAction<IRegisterTutor>) => {
      state.title = action.payload.title;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.gender = action.payload.gender;
      state.preferredName = action.payload.preferredName;
      state.phone = action.payload.phone;
      state.mobile = action.payload.mobile;
      state.address1 = action.payload.address1;
      state.address2 = action.payload.address2;
      state.town = action.payload.town;
      state.county = action.payload.county;
      state.postcode = action.payload.postcode;
    },
    setParentDetails: (state, action: PayloadAction<IRegisterParent>) => {
      state.preferredName = action.payload.preferredName;
      state.town = action.payload.town;
      state.postcode = action.payload.postcode;
    },
    setStudentDetails: (state, action: PayloadAction<IRegisterStudent>) => {
      state.preferredName = action.payload.preferredName;
      state.town = action.payload.town;
      state.postcode = action.payload.postcode;
    },
    setChecks: (state, action: PayloadAction<IRegisterChecks>) => {
      state.emailVerify = action.payload.emailVerify;
      state.readSafeguarding = action.payload.readSafeguarding;
      state.over18 = action.payload.over18;
      state.rightToWork = action.payload.rightToWork;
      state.onlyAccount = action.payload.onlyAccount;
      state.agreeTerms = action.payload.agreeTerms;
    },

    // setStep: ( state , action: PayloadAction<IRegisterStep>) => {
    //     state.step = action.payload.step;
    // },
    // setRegisterStep1: ( state , action: PayloadAction<IRegisterStep1>) => {
    //     state.step = action.payload.step;
    //     state.email = action.payload.email;
    //     state.password = action.payload.password;
    //     state.password2 = action.payload.password2;
    //     state.googleEmail = action.payload.googleEmail;
    //     state.googleAcc = action.payload.googleAcc;
    //     state.googleId = action.payload.googleId;
    //     state.firstname = action.payload.firstname;
    //     state.lastname = action.payload.lastname;
    //     state.token = action.payload.token;
    // },
    // setRegisterStep2: ( state , action: PayloadAction<IRegisterStep2>) => {
    //     state.step = action.payload.step;
    //     state.accountType = action.payload.accountType;
    //     state.title = action.payload.title;
    //     state.firstname = action.payload.firstname;
    //     state.lastname = action.payload.lastname;
    //     state.gender = action.payload.gender;
    //     state.phone = action.payload.phone;
    //     state.mobile = action.payload.mobile;
    // },
    // setRegisterStep3: ( state , action: PayloadAction<IRegisterStep3>) => {
    //     state.step = action.payload.step;
    //     state.address1 = action.payload.address1;
    //     state.address2 = action.payload.address2;
    //     state.town = action.payload.town;
    //     state.county = action.payload.county;
    //     state.postcode = action.payload.postcode;
    // },
    resetRegister: (state) => {
      state.token = null;
      // (state.email = ""),
      // (state.password = ""),
      // (state.confirm = ""),
      // (state.googleEmail = ""),
      (state.googleAcc = false),
        // (state.googleId = "");
        (state.accountType = "Select account type"),
        (state.title = "ns"),
        (state.firstname = ""),
        (state.lastname = ""),
        (state.gender = "ns"),
        (state.preferredName = ""),
        (state.phone = ""),
        (state.mobile = ""),
        (state.address1 = ""),
        (state.address2 = ""),
        (state.town = "");
      state.county = "";
      state.postcode = "";
      state.emailVerify = false;
      state.readSafeguarding = false;
      state.over18 = false;
      state.rightToWork = false;
      state.onlyAccount = false;
      state.agreeTerms = false;
    },
  },
  selectors: {
    selectAll: (register) => register,
  },
});

// export const { setStep, setRegisterStep1, setRegisterStep2, setRegisterStep3, resetRegister } = registerSlice.actions;
export const {
  setRegisterEmail,
  setAccountType,
  setTutorDetails,
  setParentDetails,
  setStudentDetails,
  setChecks,
  resetRegister,
} = registerSlice.actions;

export const { selectAll } = registerSlice.selectors;

export default registerSlice.reducer;
