define({
    base: {
        path: {
            to: {
                string: "String",
                number: 1,
                float:  1.2,
                another: {
                    string: "inner",
                    inner: {
                        again: "again",
                        and: {
                            again: "again",
                            big:   "big string to see if \"+\" ...everything" +
                                   "...is....in....{place}:",
                            yet: "this should work: well without problems:"
                        }
                    }
                }
            }
        },

        another: {
            to: {
                string: "String",
                number: 2,
                float:  2.1
            }
        }
    }
});