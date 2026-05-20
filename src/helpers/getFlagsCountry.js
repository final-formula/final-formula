export default function getFlagShortName(flags, country) {
    const flag = flags.find(flag => flag.en_short_name === country);
    return flag?.alpha_2_code;
};

//Australia