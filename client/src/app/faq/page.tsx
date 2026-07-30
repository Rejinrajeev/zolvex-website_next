"use client";

import { useState, useMemo, ChangeEvent,useRef, useEffect}from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle, ChevronRight, X } from "lucide-react";
import Link from "next/link";

// FAQ data organized by category
const faqData = [
    {
        category: "General",
        questions: [
            {
                q: "Will you arrive on the exact date and time booked?",
                a: "Yes. Once a booking is confirmed, our team will arrive as scheduled. In rare and unavoidable situations, if any delay or change occurs, we will inform you in advance."
            },
            {
                q: "Do we need to be at home during the service?",
                a: "It is not mandatory for customers to stay at home. However, if access, electricity, water supply, or instructions are required during the service, someone should be available."
            },
            {
                q: "Do we need to prepare anything before the service?",
                a: "No major preparation is required. If certain areas are cleared in advance, it can help the team work faster, but our staff can manage even if everything is not prepared."
            },
            {
                q: "Will you bring all cleaning materials and equipment?",
                a: "Yes. Our team brings all required tools, equipment, and cleaning materials needed for the service."
            },
            {
                q: "Are the cleaning methods safe?",
                a: "Yes. We follow safe cleaning practices and avoid harsh or damaging methods. Customer health, safety, and property protection are our top priorities."
            },
            {
                q: "How long does a service usually take?",
                a: "The time required depends on the type of service, size of the area, and condition. Our team will give you an estimated duration before starting the work."
            },
            {
                q: "Will the entire service be completed in one day?",
                a: "Yes, in most cases the service is completed in a single day. For larger spaces or detailed services, the duration may vary and will be informed in advance."
            },
            {
                q: "How many staff members will come for the service?",
                a: "The number of staff depends on the service type and size of the job. Adequate manpower will be assigned to ensure efficient and timely completion."
            },
            {
                q: "What if there are any missed spots after cleaning?",
                a: "Customer satisfaction is important to us. If you notice any missed areas immediately after the service, please inform us and our team will address it."
            },
            {
                q: "Do you handle waste disposal after cleaning?",
                a: "Basic cleaning waste will be collected and kept aside. Final disposal can be done as per customer guidance or local disposal facilities."
            },
            {
                q: "Can you clean specific areas or handle special requests?",
                a: "Yes. If you have any specific areas or special instructions, please inform us before or during the service, and our team will try to accommodate them."
            },
            {
                q: "What services does Zolvex provide?",
                a: "We offer professional home and property cleaning services, including deep cleaning, water tank cleaning, and other specialised cleaning solutions."
            }
        ]
    },
    {
        category: "Water Tank Cleaning",
        questions: [
            {
                q: "Do you use acid or chemicals to clean the tank?",
                a: "No. We do not use acid or harsh chemicals for cleaning. Our process focuses on safe cleaning methods that remove dirt and sludge without damaging the tank or affecting water quality."
            },
            {
                q: "How long does water tank cleaning usually take?",
                a: "The cleaning time depends on the size and condition of the tank. In most cases, the process takes around 1 to 1.5 hours per tank."
            },
            {
                q: "Is it necessary for someone to be at home during the service?",
                a: "It is not compulsory for customers to be present throughout the service. However, access to electricity, water supply, or motor controls may be required, so someone should be available if needed."
            },
            {
                q: "What happens if there is water already inside the tank?",
                a: "That is not an issue. Our team will safely remove the existing water before cleaning and proceed with the service as planned."
            },
            {
                q: "What type of cleaning liquid is used?",
                a: "We use safe and suitable cleaning liquids designed for water tank cleaning. We avoid harmful substances to ensure health safety and water hygiene."
            },
            {
                q: "Do customers need to prepare anything in advance?",
                a: "No major preparation is required. If the tank is emptied beforehand, it may help speed up the process, but the service can be completed even if the tank is not pre-emptied."
            },
            {
                q: "If I empty the tank in advance, will the service still be carried out?",
                a: "Yes. Once a booking is confirmed, our team will arrive as scheduled and carry out the service accordingly."
            },
            {
                q: "Will you clean the outer surface of the water tank?",
                a: "Yes. Basic outer surface cleaning is included as part of the service."
            },
            {
                q: "Do you provide well cleaning services?",
                a: "No. At present, we do not offer well cleaning services."
            }
        ]
    },
    {
        category: "House Cleaning",
        questions: [
            {
                q: "Will you arrive on the exact date booked?",
                a: "Yes. Once the booking is confirmed, our team will arrive on the scheduled date and time. If there are any unexpected changes, customers will be informed in advance."
            },
            {
                q: "Do we need to be at home during the cleaning?",
                a: "It is not mandatory to stay at home during the entire service. However, if access, instructions, or approvals are required, someone should be available."
            },
            {
                q: "Should we prepare anything before the cleaning starts?",
                a: "No major preparation is required. If personal items are cleared in advance, it can help the team work faster, but our staff can manage even if this is not done."
            },
            {
                q: "Do you handle waste disposal after cleaning?",
                a: "Basic cleaning waste will be collected and kept aside. Final disposal can be done as per customer preference or local disposal arrangements."
            },
            {
                q: "Should we remove items from cupboards, or will you handle that?",
                a: "You may remove personal items if you prefer. If required, our team can take out items, clean the area, and place them back carefully."
            },
            {
                q: "If any spots are missed, will you come back and clean them?",
                a: "Customer satisfaction is important to us. If you notice any missed areas, please inform our team before they leave the premises, and the issue will be addressed immediately."
            },
            {
                q: "What cleaning services do you offer?",
                a: "We provide professional house cleaning services, including general cleaning, deep cleaning, and other customised cleaning solutions."
            },
            {
                q: "How often should deep cleaning be done?",
                a: "Deep cleaning is recommended once every 3 to 6 months, depending on usage and household requirements."
            },
            {
                q: "How long does house cleaning take?",
                a: "The duration depends on the size of the house, service type, and level of cleaning required. An estimated time will be shared before the service begins."
            },
            {
                q: "Can you clean specific areas separately?",
                a: "Yes. If you need specific rooms or areas cleaned, please inform us in advance so we can plan accordingly."
            },
            {
                q: "Can you rearrange items while cleaning if required?",
                a: "Yes. If rearrangement is needed during cleaning, our team can assist within reasonable limits."
            },
            {
                q: "Will the entire cleaning be completed in one day?",
                a: "Yes, most house cleaning services are completed within a single day. For larger homes or detailed services, timelines will be discussed in advance."
            },
            {
                q: "How many staff members will come for the cleaning?",
                a: "The number of staff depends on the size of the house and type of service. Adequate manpower will be assigned to ensure efficient completion."
            }
        ]
    },
    {
        category: "Sofa Cleaning",
        questions: [
            {
                q: "What types of sofas do you clean?",
                a: "We clean fabric sofas, leather sofas, recliners, and cushioned seating, depending on material condition and accessibility."
            },
            {
                q: "Do you use water or dry cleaning methods?",
                a: "The cleaning method depends on the sofa material and level of dirt. Our team will choose the most suitable and safe method after inspection."
            },
            {
                q: "Are the cleaning solutions safe?",
                a: "Yes. We use safe and non-harmful cleaning solutions suitable for upholstery. Harsh chemicals that may damage fabric or affect health are avoided."
            },
            {
                q: "Will sofa cleaning damage the fabric or colour?",
                a: "No. Our cleaning process is material-specific and done carefully to avoid colour fading or fabric damage."
            },
            {
                q: "How long does sofa cleaning take?",
                a: "Sofa cleaning usually takes 1 to 2 hours, depending on the size and condition of the sofa."
            },
            {
                q: "How long does it take for the sofa to dry?",
                a: "Drying time depends on the cleaning method, fabric type, and ventilation. On average, sofas dry within 2 to 3 hours."
            },
            {
                q: "Will you remove stains and odour completely?",
                a: "Most common stains and odours can be significantly reduced or removed. However, complete removal depends on stain type and how long it has been present."
            },
            {
                q: "Will you clean cushions separately?",
                a: "Yes. Cushions will be cleaned separately where required for better results."
            }
        ]
    }
];


// Helper to flatten all questions for search
const allQuestions = faqData.flatMap(cat => cat.questions.map(q => ({ ...q, category: cat.category })));

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("General");
    const [openItems, setOpenItems] = useState<string[]>([]);
    const categoryScrollRef = useRef<HTMLDivElement>(null);

    // Get unique categories
    const categories = faqData.map(item => item.category);

    // Filter questions based on search and selected category
    const filteredData = useMemo(() => {
        if (searchQuery.trim() === "") {
            // No search: show selected category's questions
            const categoryData = faqData.find(item => item.category === selectedCategory);
            return categoryData?.questions || [];
        } else {
            // Search across all categories
            const lowerQuery = searchQuery.toLowerCase();
            return allQuestions.filter(
                q => q.q.toLowerCase().includes(lowerQuery) || q.a.toLowerCase().includes(lowerQuery)
            );
        }
    }, [selectedCategory, searchQuery]);

    // When searching, we might want to show results from any category
    // We'll adjust the category highlight: if search is active, we show "Search Results" as pseudo-category
    const displayCategory = searchQuery.trim() !== "" ? "Search Results" : selectedCategory;

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        // Optionally collapse all when searching
        setOpenItems([]);
    };

    const clearSearch = () => {
        setSearchQuery("");
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setSearchQuery(""); // Clear search when switching categories
        setOpenItems([]);
        // Smooth scroll to top of FAQ list on mobile
        if (window.innerWidth < 1024) {
            document.getElementById("faq-list")?.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Handle accordion change
    const handleAccordionChange = (value: string[]) => {
        setOpenItems(value);
    };

    // Scroll active category into view on mobile when selected
    useEffect(() => {
        if (categoryScrollRef.current && window.innerWidth < 1024) {
            const activeButton = categoryScrollRef.current.querySelector(`[data-category="${selectedCategory}"]`);
            if (activeButton) {
                activeButton.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
        }
    }, [selectedCategory]);

    return (
        <div className="bg-background min-h-screen py-12 md:py-16">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-muted text-lg">
                        Get questions? Get answers.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-xl mx-auto mb-8 lg:mb-12">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                        <Input
                            type="text"
                            placeholder="Search FAQs..."
                            className="pl-10 pr-10 py-6 bg-white border-border rounded-xl shadow-sm focus:border-primary focus:ring-primary w-full"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {searchQuery && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                                aria-label="Clear search"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Categories - Desktop Sidebar */}
                    <aside className="hidden lg:block lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden sticky top-24">
                            <div className="p-4 bg-primary/5 border-b border-border">
                                <h2 className="font-semibold text-foreground">Categories</h2>
                            </div>
                            <nav className="p-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        data-category={category}
                                        onClick={() => handleCategoryChange(category)}
                                        className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${selectedCategory === category && !searchQuery
                                                ? "bg-primary text-white shadow-md"
                                                : "hover:bg-primary/10 text-muted hover:text-foreground"
                                            }`}
                                    >
                                        <span>{category}</span>
                                        {selectedCategory === category && !searchQuery && (
                                            <ChevronRight className="w-4 h-4" />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Still have questions card - desktop */}
                        <div className="hidden lg:block mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20">
                            <MessageCircle className="w-10 h-10 text-primary mb-3" />
                            <h3 className="font-semibold text-foreground mb-2">Still have questions?</h3>
                            <p className="text-sm text-muted mb-4">
                                Can't find what you're looking for? Get in touch with us.
                            </p>
                            <Link href="/contact">
                                <Button className="w-full bg-primary text-white hover:bg-primaryHover">
                                    Get In Touch
                                </Button>
                            </Link>
                        </div>
                    </aside>

                    {/* Mobile Categories - Horizontal Scroll */}
                    <div className="lg:hidden -mx-4 px-4 mb-4">
                        <div
                            ref={categoryScrollRef}
                            className="flex overflow-x-auto gap-2 pb-2 no-scrollbar"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    data-category={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category && !searchQuery
                                            ? "bg-primary text-white shadow-md"
                                            : "bg-white border border-border text-muted hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div id="faq-list" className="flex-1">
                        {/* Category/Results header */}
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground">
                                {searchQuery ? `Search Results (${filteredData.length})` : selectedCategory}
                            </h2>
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="text-sm text-primary hover:underline"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>

                        {filteredData.length > 0 ? (
                            <Accordion
                                type="multiple"
                                value={openItems}
                                onValueChange={handleAccordionChange}
                                className="space-y-4"
                            >
                                {filteredData.map((item, index) => {
                                    const itemId = `item-${index}`;
                                    return (
                                        <AccordionItem
                                            key={itemId}
                                            value={itemId}
                                            className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <AccordionTrigger className="px-4 md:px-6 py-4 hover:no-underline hover:bg-primary/5 transition-colors text-left">
                                                <span className="text-sm md:text-base font-medium text-foreground">
                                                    {item.q}
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="px-4 md:px-6 pb-4 pt-2 text-muted text-sm md:text-base border-t border-border">
                                                {item.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    );
                                })}
                            </Accordion>
                        ) : (
                            <div className="text-center py-16 bg-white rounded-xl border border-border">
                                <MessageCircle className="w-12 h-12 text-muted mx-auto mb-3" />
                                <p className="text-muted mb-2">No questions found</p>
                                <p className="text-sm text-muted mb-4">
                                    Try a different search or browse categories.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchQuery("");
                                        setSelectedCategory("General");
                                    }}
                                    className="border-primary text-primary hover:bg-primary hover:text-white"
                                >
                                    View all FAQs
                                </Button>
                            </div>
                        )}

                        {/* Still have questions - mobile version */}
                        <div className="lg:hidden mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20 text-center">
                            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                            <h3 className="font-semibold text-foreground mb-2">Still have questions?</h3>
                            <p className="text-sm text-muted mb-4">
                                Can't find what you're looking for? Get in touch with us.
                            </p>
                            <Link href="/contact">
                                <Button className="bg-primary text-white hover:bg-primaryHover px-8">
                                    Get In Touch
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
