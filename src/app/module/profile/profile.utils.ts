export const flattenForUpdate = (data: Record<string, any>): Record<string, any> => {
    const updateData: Record<string, any> = {};
    Object.entries(data).forEach(([sectionKey, sectionValue]) => {
        if (!sectionValue || typeof sectionValue !== 'object') return;
        Object.entries(sectionValue).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                updateData[`${sectionKey}.${key}`] = value;
            }
        });
    });

    return updateData;
};
