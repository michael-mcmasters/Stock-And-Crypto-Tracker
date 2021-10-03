import { useState } from "react";

// Returns whether a component is currently enabled or not.
const UseComponentEnabled = () => {

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);

    return () => setEnabled(false);
  }, [])

  return enabled;
};

export default UseComponentEnabled;