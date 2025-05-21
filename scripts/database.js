// Database module for Operation Mirror Cloud

class Database {
    constructor() {
        this.data = {
            "Syria": {
                "people": [
                    { 
                        id: "4B551AA6-FDFA-4D05-A75D-09D4CC2B781D",
                        name: "Unknown Name", 
                        image: "suspect_people/{4B551AA6-FDFA-4D05-A75D-09D4CC2B781D}.png", 
                        details: "Height: 1.81-1.87, Black Hair, Slim | Genocide in Tartus and Latakia",
                        risk: "high",
                        locations: ["Tartus", "Latakia"],
                        associates: ["4C5737BA-62D0-46D1-A07A-8868E329D7F6", "8A4C53ED-5E0A-47FD-9266-0F64B1E196D7"],
                        lastSeen: "2025",
                        activities: [
                            { date: "2025", location: "Tartus", description: "Participated in mass executions" },
                            { date: "2025", location: "Latakia", description: "Commanded terrorist cell" }
                        ]
                    },
                    { 
                        id: "4C5737BA-62D0-46D1-A07A-8868E329D7F6",
                        name: "Unknown Name", 
                        image: "suspect_people/{4C5737BA-62D0-46D1-A07A-8868E329D7F6}.png", 
                        details: "Height: 1.73-1.77, Red Hair, Medium Build | Genocide in Tartus and Latakia - 2025",
                        risk: "high",
                        locations: ["Tartus", "Aleppo"],
                        associates: ["4B551AA6-FDFA-4D05-A75D-09D4CC2B781D", "7711430C-F34F-4EB9-B750-88E594F82006"],
                        lastSeen: "2025",
                        activities: [
                            { date: "2025", location: "Aleppo", description: "Supervised weapons transport" },
                            { date: "2025", location: "Tartus", description: "Participated in attacks on civilians" }
                        ]
                    },
                    { 
                        id: "8A4C53ED-5E0A-47FD-9266-0F64B1E196D7",
                        name: "Unknown Name", 
                        image: "suspect_people/{8A4C53ED-5E0A-47FD-9266-0F64B1E196D7}.png", 
                        details: "Height: 1.84-1.88, Large Build | Genocide in Tartus and Latakia - 2025",
                        risk: "medium",
                        locations: ["Latakia"],
                        associates: ["4B551AA6-FDFA-4D05-A75D-09D4CC2B781D"],
                        lastSeen: "2025",
                        activities: [
                            { date: "2025", location: "Latakia", description: "Guarded terrorist facility" }
                        ]
                    }
                ],
                "vehicles": [
                    { 
                        id: "204C80FB-A22C-4DA2-93C0-CBF2EBCEAA71",
                        model: "Toyota Land Cruiser 2007 White", 
                        plate: "?????74??", 
                        image: "suspect_vehicles/{204C80FB-A22C-4DA2-93C0-CBF2EBCEAA71}.png", 
                        details: "Used for killings with a Land Cruiser type vehicle and ammunition transport - 2025",
                        risk: "high",
                        locations: ["Tartus", "Syria"],
                        associatedPeople: ["4B551AA6-FDFA-4D05-A75D-09D4CC2B781D"],
                        lastSeen: "2025",
                        activities: [
                            { date: "2025", location: "Tartus", description: "Used in attack on military checkpoint" },
                            { date: "2025", location: "Syria", description: "Spotted transporting weapons" }
                        ]
                    },
                    { 
                        id: "134521EC-4382-4978-930A-8C22014846C4",
                        model: "Kia Bongo 3 White", 
                        plate: "Unknown Plate", 
                        image: "suspect_vehicles/{134521EC-4382-4978-930A-8C22014846C4}.png", 
                        details: "Transport of Ammunition and Terrorists - 2025",
                        risk: "medium",
                        locations: ["Latakia"],
                        associatedPeople: ["4C5737BA-62D0-46D1-A07A-8868E329D7F6"],
                        lastSeen: "2025",
                        activities: [
                            { date: "2025", location: "Latakia", description: "Used for transporting fighters" }
                        ]
                    }
                ],
                "organizations": [
                    {
                        id: "ORG-SYR-001",
                        name: "Al-Nusra Cell",
                        type: "terrorist",
                        risk: "high",
                        description: "Active terrorist cell operating in western Syria",
                        members: ["4B551AA6-FDFA-4D05-A75D-09D4CC2B781D", "4C5737BA-62D0-46D1-A07A-8868E329D7F6"],
                        locations: ["Tartus", "Latakia"],
                        lastActivity: "2025"
                    }
                ]
            },
            "Sudan": {
                "people": [
                    { 
                        id: "SUD-P-001",
                        name: "No Info", 
                        image: "suspect_people/undefined_person.png", 
                        details: "Undefined",
                        risk: "low",
                        locations: [],
                        associates: [],
                        lastSeen: "",
                        activities: []
                    }
                ],
                "vehicles": [
                    { 
                        id: "SUD-V-001",
                        model: "No Info", 
                        plate: "No-404", 
                        image: "suspect_vehicles/undefined_vehicle.png", 
                        details: "No Vehicle Found",
                        risk: "low",
                        locations: [],
                        associatedPeople: [],
                        lastSeen: "",
                        activities: []
                    }
                ],
                "organizations": []
            },
            "Nigeria": {
                "people": [
                    { 
                        id: "NGR-P-001",
                        name: "No Info", 
                        image: "suspect_people/undefined_person.png", 
                        details: "Undefined",
                        risk: "low",
                        locations: [],
                        associates: [],
                        lastSeen: "",
                        activities: []
                    }
                ],
                "vehicles": [
                    { 
                        id: "NGR-V-001",
                        model: "No Info", 
                        plate: "No-404", 
                        image: "suspect_vehicles/undefined_vehicle.png", 
                        details: "No Vehicle Found",
                        risk: "low",
                        locations: [],
                        associatedPeople: [],
                        lastSeen: "",
                        activities: []
                    }
                ],
                "organizations": []
            }
        };
    }

    getCountries() {
        return Object.keys(this.data);
    }

    getCategories() {
        return ["people", "vehicles", "organizations"];
    }

    search(query = "", filters = {}) {
        let results = [];
        const queryLower = query.toLowerCase();
        
        const countries = filters.country && filters.country !== "all" 
            ? [filters.country] 
            : this.getCountries();
        
        const categories = filters.category && filters.category !== "all" 
            ? [filters.category] 
            : this.getCategories();
        
        const risks = filters.risk && filters.risk !== "all" 
            ? [filters.risk] 
            : ["high", "medium", "low"];
        
        countries.forEach(country => {
            categories.forEach(category => {
                if (this.data[country] && this.data[country][category]) {
                    this.data[country][category].forEach(item => {
                        if (!risks.includes(item.risk)) return;
                        
                        const searchFields = [
                            item.name || "", 
                            item.model || "", 
                            item.plate || "",
                            item.details || "", 
                            ...(item.locations || []),
                            ...(item.activities?.map(a => a.description) || [])
                        ].join(" ").toLowerCase();
                        
                        if (query === "" || searchFields.includes(queryLower)) {
                            results.push({
                                ...item,
                                country,
                                category
                            });
                        }
                    });
                }
            });
        });
        
        if (filters.sort) {
            results.sort((a, b) => {
                if (filters.sort === "risk") {
                    const riskOrder = { high: 3, medium: 2, low: 1 };
                    return riskOrder[b.risk] - riskOrder[a.risk];
                } else if (filters.sort === "country") {
                    return a.country.localeCompare(b.country);
                } else if (filters.sort === "date") {
                    return new Date(b.lastSeen) - new Date(a.lastSeen);
                }
                return 0;
            });
        }
        
        return results;
    }

    getById(id) {
        for (const country in this.data) {
            for (const category in this.data[country]) {
                const item = this.data[country][category].find(i => i.id === id);
                if (item) {
                    return {
                        ...item,
                        country,
                        category
                    };
                }
            }
        }
        return null;
    }

    getAssociates(item) {
        if (!item) return [];
        
        const associateIds = [];
        
        if (item.category === "people" && item.associates) {
            associateIds.push(...item.associates);
        }
        
        if (item.category === "vehicles" && item.associatedPeople) {
            associateIds.push(...item.associatedPeople);
        }
        
        if (item.category === "organizations" && item.members) {
            associateIds.push(...item.members);
        }
        
        const uniqueIds = [...new Set(associateIds)];
        return uniqueIds.map(id => this.getById(id)).filter(Boolean);
    }

    getStatistics() {
        const stats = {
            totalSuspects: 0,
            totalVehicles: 0,
            totalOrganizations: 0,
            byCountry: {},
            byRisk: {
                high: 0,
                medium: 0,
                low: 0
            }
        };
        
        this.getCountries().forEach(country => {
            stats.byCountry[country] = {
                people: 0,
                vehicles: 0,
                organizations: 0
            };
            
            this.getCategories().forEach(category => {
                if (this.data[country] && this.data[country][category]) {
                    const count = this.data[country][category].length;
                    
                    if (category === "people") {
                        stats.totalSuspects += count;
                        stats.byCountry[country].people = count;
                    } else if (category === "vehicles") {
                        stats.totalVehicles += count;
                        stats.byCountry[country].vehicles = count;
                    } else if (category === "organizations") {
                        stats.totalOrganizations += count;
                        stats.byCountry[country].organizations = count;
                    }
                    
                    this.data[country][category].forEach(item => {
                        if (item.risk) {
                            stats.byRisk[item.risk]++;
                        }
                    });
                }
            });
        });
        
        return stats;
    }

    getRecentActivity(limit = 5) {
        const allActivities = [];
        
        this.getCountries().forEach(country => {
            this.getCategories().forEach(category => {
                if (this.data[country] && this.data[country][category]) {
                    this.data[country][category].forEach(item => {
                        if (item.activities) {
                            item.activities.forEach(activity => {
                                allActivities.push({
                                    ...activity,
                                    itemId: item.id,
                                    itemName: item.name || item.model,
                                    itemType: category,
                                    country
                                });
                            });
                        }
                    });
                }
            });
        });
        
        allActivities.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        return allActivities.slice(0, limit);
    }

    getTopWanted(limit = 3) {
        const allPeople = [];
        this.getCountries().forEach(country => {
            if (this.data[country] && this.data[country].people) {
                allPeople.push(...this.data[country].people.map(p => ({
                    ...p,
                    country
                })));
            }
        });
        
        return allPeople
            .filter(p => p.risk === "high")
            .sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen))
            .slice(0, limit);
    }

    getSuspiciousVehicles(limit = 2) {
        const allVehicles = [];
        this.getCountries().forEach(country => {
            if (this.data[country] && this.data[country].vehicles) {
                allVehicles.push(...this.data[country].vehicles.map(v => ({
                    ...v,
                    country
                })));
            }
        });
        
        return allVehicles
            .sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen))
            .slice(0, limit);
    }
}

const TerrorWatchDB = new Database();
export default TerrorWatchDB;
