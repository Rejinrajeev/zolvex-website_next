(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/client/src/components/ui/input.tsx",
        lineNumber: 8,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/components/ui/accordion.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Accordion",
    ()=>Accordion,
    "AccordionContent",
    ()=>AccordionContent,
    "AccordionItem",
    ()=>AccordionItem,
    "AccordionTrigger",
    ()=>AccordionTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@radix-ui/react-accordion/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Accordion = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const AccordionItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-b", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/client/src/components/ui/accordion.tsx",
        lineNumber: 15,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c1 = AccordionItem;
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Header"], {
        className: "flex",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            ref: ref,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180", className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                }, void 0, false, {
                    fileName: "[project]/client/src/components/ui/accordion.tsx",
                    lineNumber: 37,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/components/ui/accordion.tsx",
            lineNumber: 28,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/client/src/components/ui/accordion.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c3 = AccordionTrigger;
AccordionTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"].displayName;
const AccordionContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = ({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
        ref: ref,
        className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("pb-4 pt-0", className),
            children: children
        }, void 0, false, {
            fileName: "[project]/client/src/components/ui/accordion.tsx",
            lineNumber: 52,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/client/src/components/ui/accordion.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c5 = AccordionContent;
AccordionContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$accordion$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "AccordionItem$React.forwardRef");
__turbopack_context__.k.register(_c1, "AccordionItem");
__turbopack_context__.k.register(_c2, "AccordionTrigger$React.forwardRef");
__turbopack_context__.k.register(_c3, "AccordionTrigger");
__turbopack_context__.k.register(_c4, "AccordionContent$React.forwardRef");
__turbopack_context__.k.register(_c5, "AccordionContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/faq/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FAQPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/components/ui/accordion.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/client/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
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
const allQuestions = faqData.flatMap((cat)=>cat.questions.map((q)=>({
            ...q,
            category: cat.category
        })));
function FAQPage() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(59);
    if ($[0] !== "1fff94ce571dafe7070d3b8e3f01cd36a092ecd06be41416b2711efd0c0cf8ea") {
        for(let $i = 0; $i < 59; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "1fff94ce571dafe7070d3b8e3f01cd36a092ecd06be41416b2711efd0c0cf8ea";
    }
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("General");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [openItems, setOpenItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t0);
    const categoryScrollRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const categories = faqData.map(_FAQPageFaqDataMap);
    let t1;
    if (searchQuery.trim() === "") {
        let t2;
        if ($[2] !== selectedCategory) {
            t2 = faqData.find({
                "FAQPage[faqData.find()]": (item_0)=>item_0.category === selectedCategory
            }["FAQPage[faqData.find()]"]);
            $[2] = selectedCategory;
            $[3] = t2;
        } else {
            t2 = $[3];
        }
        const categoryData = t2;
        let t3;
        if ($[4] !== categoryData?.questions) {
            t3 = categoryData?.questions || [];
            $[4] = categoryData?.questions;
            $[5] = t3;
        } else {
            t3 = $[5];
        }
        t1 = t3;
    } else {
        let t2;
        if ($[6] !== searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            t2 = allQuestions.filter({
                "FAQPage[allQuestions.filter()]": (q)=>q.q.toLowerCase().includes(lowerQuery) || q.a.toLowerCase().includes(lowerQuery)
            }["FAQPage[allQuestions.filter()]"]);
            $[6] = searchQuery;
            $[7] = t2;
        } else {
            t2 = $[7];
        }
        t1 = t2;
    }
    const filteredData = t1;
    searchQuery.trim() !== "" ? "Search Results" : selectedCategory;
    let t2;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "FAQPage[handleSearchChange]": (e)=>{
                setSearchQuery(e.target.value);
                setOpenItems([]);
            }
        })["FAQPage[handleSearchChange]"];
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    const handleSearchChange = t2;
    let t3;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "FAQPage[clearSearch]": ()=>{
                setSearchQuery("");
            }
        })["FAQPage[clearSearch]"];
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    const clearSearch = t3;
    let t4;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "FAQPage[handleCategoryChange]": (category)=>{
                setSelectedCategory(category);
                setSearchQuery("");
                setOpenItems([]);
                if (window.innerWidth < 1024) {
                    document.getElementById("faq-list")?.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        })["FAQPage[handleCategoryChange]"];
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    const handleCategoryChange = t4;
    let t5;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = ({
            "FAQPage[handleAccordionChange]": (value)=>{
                setOpenItems(value);
            }
        })["FAQPage[handleAccordionChange]"];
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    const handleAccordionChange = t5;
    let t6;
    let t7;
    if ($[12] !== selectedCategory) {
        t6 = ({
            "FAQPage[useEffect()]": ()=>{
                if (categoryScrollRef.current && window.innerWidth < 1024) {
                    const activeButton = categoryScrollRef.current.querySelector(`[data-category="${selectedCategory}"]`);
                    if (activeButton) {
                        activeButton.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest",
                            inline: "center"
                        });
                    }
                }
            }
        })["FAQPage[useEffect()]"];
        t7 = [
            selectedCategory
        ];
        $[12] = selectedCategory;
        $[13] = t6;
        $[14] = t7;
    } else {
        t6 = $[13];
        t7 = $[14];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t6, t7);
    let t8;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center max-w-2xl mx-auto mb-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl md:text-4xl font-bold text-foreground mb-3",
                    children: "Frequently Asked Questions"
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 299,
                    columnNumber: 62
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted text-lg",
                    children: "Get questions? Get answers."
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 299,
                    columnNumber: 161
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 299,
            columnNumber: 10
        }, this);
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 306,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== searchQuery) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            type: "text",
            placeholder: "Search FAQs...",
            className: "pl-10 pr-10 py-6 bg-white border-border rounded-xl shadow-sm focus:border-primary focus:ring-primary w-full",
            value: searchQuery,
            onChange: handleSearchChange
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 313,
            columnNumber: 11
        }, this);
        $[17] = searchQuery;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] !== clearSearch || $[20] !== searchQuery) {
        t11 = searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: clearSearch,
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground",
            "aria-label": "Clear search",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                className: "w-5 h-5"
            }, void 0, false, {
                fileName: "[project]/client/src/app/faq/page.tsx",
                lineNumber: 321,
                columnNumber: 169
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 321,
            columnNumber: 26
        }, this);
        $[19] = clearSearch;
        $[20] = searchQuery;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    let t12;
    if ($[22] !== t10 || $[23] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-xl mx-auto mb-8 lg:mb-12",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    t9,
                    t10,
                    t11
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/faq/page.tsx",
                lineNumber: 330,
                columnNumber: 59
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 330,
            columnNumber: 11
        }, this);
        $[22] = t10;
        $[23] = t11;
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 bg-primary/5 border-b border-border",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "font-semibold text-foreground",
                children: "Categories"
            }, void 0, false, {
                fileName: "[project]/client/src/app/faq/page.tsx",
                lineNumber: 339,
                columnNumber: 68
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 339,
            columnNumber: 11
        }, this);
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    let t14;
    if ($[26] !== searchQuery || $[27] !== selectedCategory) {
        t14 = ({
            "FAQPage[categories.map()]": (category_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "data-category": category_0,
                    onClick: {
                        "FAQPage[categories.map() > <button>.onClick]": ()=>handleCategoryChange(category_0)
                    }["FAQPage[categories.map() > <button>.onClick]"],
                    className: `w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${selectedCategory === category_0 && !searchQuery ? "bg-primary text-white shadow-md" : "hover:bg-primary/10 text-muted hover:text-foreground"}`,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: category_0
                        }, void 0, false, {
                            fileName: "[project]/client/src/app/faq/page.tsx",
                            lineNumber: 349,
                            columnNumber: 309
                        }, this),
                        selectedCategory === category_0 && !searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                            className: "w-4 h-4"
                        }, void 0, false, {
                            fileName: "[project]/client/src/app/faq/page.tsx",
                            lineNumber: 349,
                            columnNumber: 386
                        }, this)
                    ]
                }, category_0, true, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 347,
                    columnNumber: 50
                }, this)
        })["FAQPage[categories.map()]"];
        $[26] = searchQuery;
        $[27] = selectedCategory;
        $[28] = t14;
    } else {
        t14 = $[28];
    }
    let t15;
    let t16;
    let t17;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
            className: "w-10 h-10 text-primary mb-3"
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 361,
            columnNumber: 11
        }, this);
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold text-foreground mb-2",
            children: "Still have questions?"
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 362,
            columnNumber: 11
        }, this);
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted mb-4",
            children: "Can't find what you're looking for? Get in touch with us."
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 363,
            columnNumber: 11
        }, this);
        $[29] = t15;
        $[30] = t16;
        $[31] = t17;
    } else {
        t15 = $[29];
        t16 = $[30];
        t17 = $[31];
    }
    let t18;
    if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "hidden lg:block mt-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20",
            children: [
                t15,
                t16,
                t17,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/contact",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-full bg-primary text-white hover:bg-primaryHover",
                        children: "Get In Touch"
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/faq/page.tsx",
                        lineNumber: 374,
                        columnNumber: 176
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 374,
                    columnNumber: 154
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 374,
            columnNumber: 11
        }, this);
        $[32] = t18;
    } else {
        t18 = $[32];
    }
    const t19 = "lg:hidden -mx-4 px-4 mb-4";
    const t20 = "flex overflow-x-auto gap-2 pb-2 no-scrollbar";
    let t21;
    if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
        t21 = {
            scrollbarWidth: "none",
            msOverflowStyle: "none"
        };
        $[33] = t21;
    } else {
        t21 = $[33];
    }
    let t22;
    if ($[34] !== searchQuery || $[35] !== selectedCategory) {
        t22 = ({
            "FAQPage[categories.map()]": (category_1)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "data-category": category_1,
                    onClick: {
                        "FAQPage[categories.map() > <button>.onClick]": ()=>handleCategoryChange(category_1)
                    }["FAQPage[categories.map() > <button>.onClick]"],
                    className: `flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category_1 && !searchQuery ? "bg-primary text-white shadow-md" : "bg-white border border-border text-muted hover:border-primary hover:text-primary"}`,
                    children: category_1
                }, category_1, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 394,
                    columnNumber: 50
                }, this)
        })["FAQPage[categories.map()]"];
        $[34] = searchQuery;
        $[35] = selectedCategory;
        $[36] = t22;
    } else {
        t22 = $[36];
    }
    const t23 = categories.map(t22);
    let t24;
    if ($[37] !== t21 || $[38] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t19,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: categoryScrollRef,
                className: t20,
                style: t21,
                children: t23
            }, void 0, false, {
                fileName: "[project]/client/src/app/faq/page.tsx",
                lineNumber: 407,
                columnNumber: 32
            }, this)
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 407,
            columnNumber: 11
        }, this);
        $[37] = t21;
        $[38] = t23;
        $[39] = t24;
    } else {
        t24 = $[39];
    }
    const t25 = searchQuery ? `Search Results (${filteredData.length})` : selectedCategory;
    let t26;
    if ($[40] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-xl font-semibold text-foreground",
            children: t25
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 417,
            columnNumber: 11
        }, this);
        $[40] = t25;
        $[41] = t26;
    } else {
        t26 = $[41];
    }
    let t27;
    if ($[42] !== clearSearch || $[43] !== searchQuery) {
        t27 = searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: clearSearch,
            className: "text-sm text-primary hover:underline",
            children: "Clear search"
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 425,
            columnNumber: 26
        }, this);
        $[42] = clearSearch;
        $[43] = searchQuery;
        $[44] = t27;
    } else {
        t27 = $[44];
    }
    let t28;
    if ($[45] !== t26 || $[46] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mb-4 flex items-center justify-between",
            children: [
                t26,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 434,
            columnNumber: 11
        }, this);
        $[45] = t26;
        $[46] = t27;
        $[47] = t28;
    } else {
        t28 = $[47];
    }
    let t29;
    if ($[48] !== filteredData || $[49] !== handleAccordionChange || $[50] !== openItems) {
        t29 = filteredData.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Accordion"], {
            type: "multiple",
            value: openItems,
            onValueChange: handleAccordionChange,
            className: "space-y-4",
            children: filteredData.map(_FAQPageFilteredDataMap)
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 443,
            columnNumber: 37
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-16 bg-white rounded-xl border border-border",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    className: "w-12 h-12 text-muted mx-auto mb-3"
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 443,
                    columnNumber: 276
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-muted mb-2",
                    children: "No questions found"
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 443,
                    columnNumber: 339
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-muted mb-4",
                    children: "Try a different search or browse categories."
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 443,
                    columnNumber: 392
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    onClick: {
                        "FAQPage[<Button>.onClick]": ()=>{
                            setSearchQuery("");
                            setSelectedCategory("General");
                        }
                    }["FAQPage[<Button>.onClick]"],
                    className: "border-primary text-primary hover:bg-primary hover:text-white",
                    children: "View all FAQs"
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 443,
                    columnNumber: 479
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 443,
            columnNumber: 200
        }, this);
        $[48] = filteredData;
        $[49] = handleAccordionChange;
        $[50] = openItems;
        $[51] = t29;
    } else {
        t29 = $[51];
    }
    let t30;
    let t31;
    let t32;
    if ($[52] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
            className: "w-12 h-12 text-primary mx-auto mb-3"
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 460,
            columnNumber: 11
        }, this);
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "font-semibold text-foreground mb-2",
            children: "Still have questions?"
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 461,
            columnNumber: 11
        }, this);
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted mb-4",
            children: "Can't find what you're looking for? Get in touch with us."
        }, void 0, false, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 462,
            columnNumber: 11
        }, this);
        $[52] = t30;
        $[53] = t31;
        $[54] = t32;
    } else {
        t30 = $[52];
        t31 = $[53];
        t32 = $[54];
    }
    let t33;
    if ($[55] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "lg:hidden mt-8 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 border border-primary/20 text-center",
            children: [
                t30,
                t31,
                t32,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/contact",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "bg-primary text-white hover:bg-primaryHover px-8",
                        children: "Get In Touch"
                    }, void 0, false, {
                        fileName: "[project]/client/src/app/faq/page.tsx",
                        lineNumber: 473,
                        columnNumber: 182
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 473,
                    columnNumber: 160
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 473,
            columnNumber: 11
        }, this);
        $[55] = t33;
    } else {
        t33 = $[55];
    }
    let t34;
    if ($[56] !== t28 || $[57] !== t29) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            id: "faq-list",
            className: "flex-1",
            children: [
                t28,
                t29,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 480,
            columnNumber: 11
        }, this);
        $[56] = t28;
        $[57] = t29;
        $[58] = t34;
    } else {
        t34 = $[58];
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-background min-h-screen py-12 md:py-16",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4",
            children: [
                t8,
                t12,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col lg:flex-row gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "hidden lg:block lg:w-64 flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-xl shadow-sm border border-border overflow-hidden sticky top-24",
                                    children: [
                                        t13,
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                            className: "p-2",
                                            children: categories.map(t14)
                                        }, void 0, false, {
                                            fileName: "[project]/client/src/app/faq/page.tsx",
                                            lineNumber: 487,
                                            columnNumber: 327
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/client/src/app/faq/page.tsx",
                                    lineNumber: 487,
                                    columnNumber: 224
                                }, this),
                                t18
                            ]
                        }, void 0, true, {
                            fileName: "[project]/client/src/app/faq/page.tsx",
                            lineNumber: 487,
                            columnNumber: 167
                        }, this),
                        t24,
                        t34
                    ]
                }, void 0, true, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 487,
                    columnNumber: 118
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/faq/page.tsx",
            lineNumber: 487,
            columnNumber: 69
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/app/faq/page.tsx",
        lineNumber: 487,
        columnNumber: 10
    }, this);
}
_s(FAQPage, "x/AsS6l82G4QroY9HUiIJWgT1Y4=");
_c = FAQPage;
function _FAQPageFilteredDataMap(item_1, index) {
    const itemId = `item-${index}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionItem"], {
        value: itemId,
        className: "bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionTrigger"], {
                className: "px-4 md:px-6 py-4 hover:no-underline hover:bg-primary/5 transition-colors text-left",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm md:text-base font-medium text-foreground",
                    children: item_1.q
                }, void 0, false, {
                    fileName: "[project]/client/src/app/faq/page.tsx",
                    lineNumber: 491,
                    columnNumber: 280
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/app/faq/page.tsx",
                lineNumber: 491,
                columnNumber: 166
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$components$2f$ui$2f$accordion$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AccordionContent"], {
                className: "px-4 md:px-6 pb-4 pt-2 text-muted text-sm md:text-base border-t border-border",
                children: item_1.a
            }, void 0, false, {
                fileName: "[project]/client/src/app/faq/page.tsx",
                lineNumber: 491,
                columnNumber: 383
            }, this)
        ]
    }, itemId, true, {
        fileName: "[project]/client/src/app/faq/page.tsx",
        lineNumber: 491,
        columnNumber: 10
    }, this);
}
function _FAQPageFaqDataMap(item) {
    return item.category;
}
var _c;
__turbopack_context__.k.register(_c, "FAQPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client_src_cb4dcd06._.js.map