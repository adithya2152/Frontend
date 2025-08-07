export interface User {
  id: number;
  username: string;
  role: 'manager' | 'driver' | 'user';
  email: string;
  // Manager-specific fields
  created_at?: string;
  updated_at?: string;
  // Driver-specific fields
  first_name?: string;
  last_name?: string;
  license_number?: string;
  license_class?: string;
  date_of_birth?: string;
  insurance_policy_number?: string;
  phone_number?: string;
  address?: string;
  image_url?: string;
  manager_id?: number;
}

// export interface ManagerUser {
//   id: number; // maps to manager_id
//   email: string;
//   role: 'manager';
//   created_at?: string;
//   updated_at?: string;
// }

// export interface DriverUser {
//   id: number; // maps to driver_id
//   manager_id: number | null;
//   first_name: string;
//   last_name: string;
//   license_number: string;
//   license_class: string | null;
//   date_of_birth: string | null;
//   insurance_policy_number: string | null;
//   phone_number: string | null;
//   address: string | null;
//   email: string;
//   image_url: string | null;
//   role: 'driver';
// }

// export type User = ManagerUser | DriverUser;

export interface Trip {
  trip_id: number;
  driver_username: string;
  vehicle_id: number;
  driver_id: number;
  manager_id: number | null;
  start_time: string;
  end_time: string | null;
  start_location: string | null;
  end_location: string | null;
  distance_travelled: number | null;
  average_speed: number | null;
  max_speed: number | null;
  min_speed: number | null;
  fuel_consumed: number | null;
  harsh_events_count: number;
  trip_status: 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
}

export type VehicleStatus = 'in use' | 'available' | 'maintenance';

export interface Vehicle {
  vehicle_id: number;
  manager_id: number | null;
  vehicle_type: string | null;
  make: string | null; 
  model: string | null;
  year: number | null;
  license_plate: string; // UNIQUE NOT NULL
  image_url: string | null;
  location: string | null;
  accidents: number; // DEFAULT 0
  km_driven: number | null;
  remaining_fuel: string | null;
  tire_pressure: string | null;
  service_date: string | null; // DATE
  inspection_date: string | null; // DATE 
  service_type: string | null;
  status: VehicleStatus;
  timestamp: string; // TIMESTAMP DEFAULT CURRENT_TIMESTAMP
}

export interface Driver {
  mail: string;
  id: number;
  manager_id: number | null;
  first_name: string;
  last_name: string;
  license_number: string;
  license_class: string | null;
  date_of_birth: string | null;
  insurance_policy_number: string | null;
  mobile_number: string | null;
  address: string | null;
  email: string;
  password: string;
  image_url: string | null;
}