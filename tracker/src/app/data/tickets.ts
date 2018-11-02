export class Ticket {
  url: string;
	id: number;
	label: string;
	impact: string;
	status: string
	priority: string;
	time_sensitiveness: string;
	responsible: string;
	accountable: string;
	consulted_set: string[];
	informed_set: string[];
	application: string;
	version_affected_set: string[];
	original: string
	module_set: string[];
	description: string;
}
