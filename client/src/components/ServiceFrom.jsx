import { iconMap } from "../utils/iconMap";
import { iconOptions } from "../utils/iconMap";






















const ServiceForm = ({
  form,
  handleChange,
  handleSubmit,
  buttonText
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md">

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required />

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Slug
          </label>

          <input
            type="text"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required />

        </div>

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows={4}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3" />

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Icon
          </label>

          <select
            name="icon"
            value={form.icon}
            onChange={handleChange}
            className="w-full border rounded-lg p-3">

            {iconOptions.map((i) =>
            <option key={i.name} value={i.name}>
                {i.icon}
              </option>
            )}
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Display Order
          </label>

          <input
            type="number"
            name="display_order"
            value={form.display_order}
            onChange={handleChange}
            className="w-full border rounded-lg p-3" />

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3">

            <option value="active">Active</option>

            <option value="inactive">
              Inactive
            </option>
          </select>
        </div>
      </div>

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg">

        {buttonText}
      </button>
    </form>);

};

export default ServiceForm;
