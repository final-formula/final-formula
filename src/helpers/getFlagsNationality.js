export default function getFlag(flags, country) {
    const flag = flags.find(flag => flag.nationality === country);
    return flag?.alpha_2_code;
};