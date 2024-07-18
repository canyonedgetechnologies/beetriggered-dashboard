import mongoose from 'mongoose';

const MachineSchema = new mongoose.Schema({
	name: String,
	software_version: String,
	location: String,
	status: String,
	ip_address: String,
	last_seen: Date,
	startup_time: Date,
	mac_prefix: String,
	mac_suffix: String,
	config: {},
});

export default mongoose.models.Machine ||
	mongoose.model('Machine', MachineSchema);
